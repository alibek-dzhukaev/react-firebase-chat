import NavbarHead from "./NavbarHead.jsx";
import NavbarUsers from "./NavbarUsers.jsx";
import NavbarGroups from "./NavbarGroups.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase-config.js";
import defaultAvatar from '../assets/images/avatar.jpeg'
import {AiOutlineLogout} from "react-icons/ai";
import {signOut} from 'firebase/auth'
import {useUsers} from "../../contexts/Users.jsx";
import {useMemo} from "react";
import {useGroups} from "../../contexts/Groups.jsx";
import {useFriends} from "../../contexts/Friends.jsx";


const Navbar = () => {
    const [user] = useAuthState(auth)
    const usersList = useUsers()
    const groupList = useGroups()
    const friendsList = useFriends()

    const displayedUsersList = useMemo(() => {
        if(!usersList || !user) return  []
        const friendsIds = friendsList.map(it => it.uid)

        return usersList.filter(it => it.uid !== user.uid && friendsIds.includes(it.uid))
    }, [user, usersList, friendsList])


    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error(error)
        }
    }

    if(!user) {
        return <div>loading</div>
    }

    return (
        <div className='flex flex-col gap-3 bg-[#191919] p-3 w-[250px] rounded-xl min-h-full'>
            <NavbarHead>
                <div className='flex flex-row gap-1.5 items-center'>
                    <img src={user.photoURL || defaultAvatar} alt="avatar" className='w-8 rounded-xl'/>
                    <span className='text-zinc-500 text-sm'>{user.displayName || user.email}</span>
                </div>
            </NavbarHead>
            <span className='border-b-neutral-600/40 border-b-2'/>
            <NavbarUsers users={displayedUsersList}/>
            <span className='border-b-neutral-600/40 border-b-2'/>
            <NavbarGroups groups={groupList}/>

            <AiOutlineLogout size={20} className='text-white absolute bottom-10 hover:cursor-pointer' onClick={logout}/>
        </div>
    );
};

export default Navbar;
