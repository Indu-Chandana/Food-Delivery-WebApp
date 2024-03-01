import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../../../prisma/Prisma.service";
import { ConfigService } from "@nestjs/config";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly config: ConfigService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const gqlContext = GqlExecutionContext.create(context)
        const { req } = gqlContext.getContext();

        try {
            const accessToken = req.headers.accesstoken as string;
            const refreshToken = req.headers.refreshtoken as string;

            if (!accessToken || !refreshToken) {
                throw new UnauthorizedException('Please login to access this resource!')
            }

            if (accessToken) {
                const decoded = this.jwtService.verify(accessToken, {
                    secret: this.config.get<string>('ACCESS_TOKEN_SECRET')
                })

                if (!decoded) {
                    throw new UnauthorizedException("Invalid access token!")
                }

                //   const decoded = this.jwtService.decode(accessToken);

                //   const expirationTime = decoded?.exp;

                //   if (expirationTime * 1000 < Date.now()) {
                //     await this.updateAccessToken(req);
                //   }

                await this.updateAccessToken(req)
            }
            return true;
        } catch (error) {
            // console.log('error created by me', error)
            throw new UnauthorizedException(error.message)
        }

    }

    private async updateAccessToken(req: any): Promise<void> {
        try {
            const refreshTokenData = req.headers.refreshtoken as string;
            const decoded = this.jwtService.verify(refreshTokenData, {
                secret: this.config.get<string>('REFRESH_TOKEN_SECRET')
            })
            if (!decoded) {
                throw new UnauthorizedException('Invalid refresh token!');
            }

            // const decoded = this.jwtService.decode(refreshTokenData);

            // const expirationTime = decoded.exp * 1000;

            // if (expirationTime < Date.now()) {
            //   throw new UnauthorizedException(
            //     'Please login to access this resource!',
            //   );
            // }

            const user = await this.prisma.user.findUnique({
                where: {
                    id: decoded.id,
                }
            })

            const accessToken = this.jwtService.sign(
                { id: user.id },
                {
                    secret: this.config.get('ACCESS_TOKEN_SECRET'),
                    expiresIn: '15m'
                }
            )

            const refreshToken = this.jwtService.sign(
                { id: user.id },
                {
                    secret: this.config.get('REFRESH_TOKEN_SECRET'),
                    expiresIn: '7d'
                }
            )

            req.accesstoken = accessToken;
            req.refreshtoken = refreshToken;
            req.user = user;

        } catch (error) {
            throw new UnauthorizedException(error.message)
        }
    }
}