import {AiOutlineUsergroupAdd} from "react-icons/ai";
import {NavLink, useParams} from "react-router-dom";

const NavbarGroups = ({groups}) => {
    const params = useParams()


    return (
        <div>
            <NavLink to='/group-wall' className='text-zinc-500 flex flex-row gap-2 focus:bg-blue-600 focus:text-white focus:rounded-sm w-full py-2 pl-3 text-sm'>
                <AiOutlineUsergroupAdd size={20}/> Groups
            </NavLink>

            <div>
                {groups.map(group => <Group group={group} key={group.id} isActive={params.id === group.id}/>)}
            </div>
        </div>
    );
};

const Group = ({group, isActive}) => {

    return (
        <NavLink
            to={`/group-dialogue/${group.id}`}
            className={`text-sm flex gap-1.5 px-4 py-2 items-center ${isActive ? 'bg-blue-600 text-white rounded-sm' : ''}`}
        >
            <span className={`rounded-full w-[10px] h-[10px] ${group.isOnline ? 'bg-green-400' : 'bg-orange-300'}`}/>
            <span className='text-zinc-400'>{group.group_name}</span>
        </NavLink>
    )
}

export default NavbarGroups;
