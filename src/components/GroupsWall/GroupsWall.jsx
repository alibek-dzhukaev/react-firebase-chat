import GroupsHeader from "./GroupsHeader.jsx";
import {useGroups} from "../../contexts/Groups.jsx";
import GroupList from "./GroupList.jsx";

const GroupsWall = () => {
    const groups = useGroups()

    return (
        <div className='w-full bg-[#191919] rounded-xl flex flex-col'>
            <GroupsHeader groupName="All groups"/>
            <span className='border-b-neutral-600/40 border-b-2'/>
            <GroupList groups={groups}/>
        </div>
    );
};

export default GroupsWall;
