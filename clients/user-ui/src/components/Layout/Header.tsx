// import { Avatar } from '@nextui-org/react'// This work for client component
import styles from '@/src/utils/style'
import NavItems from '../NavItems'
import ProfileDropDown from "../ProfileDropDown"

const Header = () => {
    return (
        <header className='w-full bg-[#0A0713]'>
            <div className=' w-[90%]  h-[80px]  m-auto flex items-center justify-between'>
                <h1 className={`${styles.logo}`}>Foodie</h1>
                <NavItems />
                <ProfileDropDown />
            </div>
        </header>
    )
}

export default Header