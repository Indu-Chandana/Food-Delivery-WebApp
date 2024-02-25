import { useState } from "react"
import Login from "../shared/Auth/Login"
import SignUp from "../shared/Auth/SignUp"
import Verification from "../shared/Auth/Verificatin"

const AuthScreen = ({ setOpen }: { setOpen: (e: boolean) => void }) => {
    const [activeState, setActiveState] = useState("Login")

    // closing the AUth models
    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLDivElement && e.target.id === "screen") {
            setOpen(false)
        }
    }

    return (
        <div className=" w-full fixed top-0 left-0 h-screen z-50 flex items-center justify-center bg-[#00000032]"
            id="screen"
            onClick={handleClose}
        >
            <div className=" w-[500px] bg-slate-900  rounded shadow-sm p-3">
                {activeState === "Login" && <Login setActiveState={setActiveState} setOpen={setOpen} />}
                {activeState === "Signup" && <SignUp setActiveState={setActiveState} />}
                {activeState === "Verification" && <Verification setActiveState={setActiveState} />}
            </div>
        </div>
    )
}

export default AuthScreen