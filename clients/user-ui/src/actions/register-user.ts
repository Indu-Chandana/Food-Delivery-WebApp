"use server"
import prisma from "../lib/prismaDb";
import * as bcrypt from 'bcrypt'

const generateRandomPassword = () => {
    const characters = 'uFACPOuOWrSTHSSciccmTHMZjapNEhdwlwnuIXFdohTMzZMalDuFACPOuOWrSTHSSciccmTHMZjapNEhdwlwnuIXFdohTMzZMalD'
    const charactersLength = 8;

    const uniqueCharacters = [...Array.from(new Set(characters))];
    // const uniqueCharacters = [...new Set(characters)]; // this is also fine.
    // ['u', 'F', 'A', 'C', 'P'] getting unique Charactors

    let password = ''

    for (let i = 0; i < charactersLength; i++) {
        const randomIndex = Math.floor(Math.random() * uniqueCharacters.length)
        password += uniqueCharacters[randomIndex]

        // console.log('randomIndex ::', randomIndex)
    }

    // console.log('Math.random()', Math.random())
    // console.log('(Math.random() * uniqueCharacters.length)', (Math.random() * uniqueCharacters.length))

    return password
}

export const registerUser = async (userData: any) => {
    const isUserExist = await prisma.user.findUnique({
        where: {
            email: userData.email
        }
    });

    if (isUserExist) return isUserExist;

    const password = generateRandomPassword()

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            role: "User",
        }
    })

    return user;
}