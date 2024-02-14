import { BadRequestException } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { RegisterRepose } from "./types/user.types";
import { RegisterDto } from "./dto/user.dto";
// import { Response } from "express";


@Resolver('User')
// @UseFilters

export class UsersResolver {
    constructor(
        private readonly userService: UsersService
    ) { }

    @Mutation(() => RegisterRepose)
    async register(
        @Args('registerInput') registerDto: RegisterDto,
        // @Context() context: { res: Response },
    ): Promise<RegisterRepose> {
        if (!registerDto.name || !registerDto.email || !registerDto.password) {
            throw new BadRequestException('Please fill the all fields')
        }

        const user = await this.userService.register(registerDto);
        return { user };
    }

}