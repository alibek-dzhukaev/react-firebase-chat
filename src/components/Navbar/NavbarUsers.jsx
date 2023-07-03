import {FiUserPlus} from "react-icons/fi";
import {NavLink, useParams} from "react-router-dom";

const NavbarUsers = ({users}) => {
    const params = useParams()

    return (
        <div>
            <NavLink to='/chat-wall' className='text-zinc-500 flex flex-row gap-2 focus:bg-blue-600 focus:text-white focus:rounded-sm w-full py-2 pl-3 text-sm'>
                <FiUserPlus size={20}/> Users
            </NavLink>

            <section>
                {users.map(user => <User user={user} key={user.uid} isActive={params.id === user.uid}/>)}
            </section>
        </div>
    );
};

const User = ({user, isActive}) => {

    return (
        <NavLink
            to={`/chat-dialogue/${user.uid}`}
            className={`text-sm flex gap-1.5 px-4 py-2 items-center ${isActive ? 'bg-blue-600 text-white rounded-sm' : ''}`}
        >
            <span className={`rounded-full w-[10px] h-[10px] ${user.isOnline ? 'bg-green-400' : 'bg-red-400'}`}/>
            <span className='text-zinc-400'>{user.name}</span>
        </NavLink>
    )
}

export default NavbarUsers;
