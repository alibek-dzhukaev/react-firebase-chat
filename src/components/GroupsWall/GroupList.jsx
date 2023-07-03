import {useUsers} from "../../contexts/Users.jsx";
import {useCallback} from "react";
import {NavLink} from "react-router-dom";

const GroupList = ({groups}) => {
    const usersList = useUsers()

    const formatUsernames = useCallback((ids) => {
        return ids.map(id => usersList.find(usr => usr.uid === id).name)
    }, [usersList])

    return (
        <div className='text-white flex flex-row flex-wrap gap-3.5 p-4'>

            {groups.map(group =>
                <Group
                    key={group.id}
                    id={group.id}
                    groupName={group.group_name}
                    participants={formatUsernames(group.participants)}
                /> )}
        </div>
    );
};

const Group = ({groupName, participants, id}) => {
    return (
        <NavLink to={`/group-dialogue/${id}`} className='basis-80 bg-[#222222] p-4 rounded-2xl hover:cursor-pointer hover:bg-[#383838]'>
            <h3>{groupName}</h3>

            <div className='text-zinc-400 text-sm font-bold text-center mt-4'>
                Participants:
            </div>
            {participants.map(it => (
                <div
                    className='text-zinc-400 text-sm'
                    key={it}>
                    {it}
                </div>
            ))}
        </NavLink>
    )
}

export default GroupList;
