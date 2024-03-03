"use client"

import { gql, DocumentNode } from "@apollo/client"

export const FORGOTPASSWORD: DocumentNode = gql`
mutation ForgotPassword($email: String!) {
    forgotPassword(
        forgotPasswordDto: {
            email:$email
        }
    ) {
        message
    }
}
`