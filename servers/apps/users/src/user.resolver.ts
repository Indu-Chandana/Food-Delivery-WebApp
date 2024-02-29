import { BadRequestException, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { ActivationResponse, ForgotPasswordResponse, LoginResponse, LogoutResponse, RegisterRepose, ResetPasswordResponse } from "./types/user.types";
import { ActivationDto, ForgotPasswordDto, RegisterDto, ResetPasswordDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { Request, Response } from "express";
import { AuthGuard } from "./guards/auth.guard";


@Resolver('User')
// @UseFilters

export class UsersResolver {
    constructor(
        private readonly userService: UsersService
    ) { }

    @Mutation(() => RegisterRepose)
    async register(
        @Args('registerDto') registerDto: RegisterDto,
        @Context() context: { res: Response },
    ): Promise<RegisterRepose> {
        if (!registerDto.name || !registerDto.email || !registerDto.password) {
            throw new BadRequestException('Please fill the all fields')
        }

        const { activation_token } = await this.userService.register(registerDto, context.res);
        return { activation_token };
    }

    @Mutation(() => ActivationResponse)
    async activateUser(
        @Args('activationDto') activationDto: ActivationDto,
        @Context() context: { res: Response },
    ): Promise<ActivationResponse> {
        return await this.userService.activateUser(activationDto, context.res)
    }

    @Mutation(() => LoginResponse)
    async Login(
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<LoginResponse> {
        return await this.userService.Login({ email, password })
    }

    @Query(() => LoginResponse)
    @UseGuards(AuthGuard)
    async getLoggedInUser(
        @Context() context: { req: Request }
    ) {
        return await this.userService.getLoggedInUser(context.req)
    }

    @Query(() => ForgotPasswordResponse)
    // @UseGuards(AuthGuard)
    async forgotPassword(
        @Args('forgotPasswordDto') forgotPasswordDto: ForgotPasswordDto,
        // @Context() context: { res: Response },
    ): Promise<ForgotPasswordResponse> {
        return await this.userService.forgotPassword(forgotPasswordDto)
    }

    @Query(() => ResetPasswordResponse)
    async resetPassword(
        @Args('resetPasswordDto') resetPasswordDto: ResetPasswordDto,
    ): Promise<ResetPasswordResponse> {
        return await this.userService.resetPassword(resetPasswordDto);
    }


    @Query(() => LogoutResponse)
    @UseGuards(AuthGuard)
    async logoutUser(@Context() context: { req: Request }) {
        return await this.userService.Logout(context.req)
    }

    @Query(() => [User])
    async getUsers() {
        return this.userService.getUsers();
    }

}