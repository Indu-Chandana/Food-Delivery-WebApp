import ResetPassword from "@/src/shared/Auth/ResetPassword"


const Page = ({ searchParams }: {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}) => {
    const activationToken = searchParams["verify"] ?? "" // getting the token from the url

    console.log('activation Token ::', activationToken)
    return (
        <div>
            <ResetPassword activationToken={activationToken} />
        </div>
    )
}

export default Page