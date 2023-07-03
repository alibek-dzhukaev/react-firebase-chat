import GroupManagerDrawer from "../ManageGroup/GroupManagerDrawer.jsx";
import {useCallback, useMemo, useState} from "react";
import {useUsers} from "../../contexts/Users.jsx";
import GroupDialogueHeader from "./GroupDialogueHeader.jsx";
import {useGroups} from "../../contexts/Groups.jsx";
import {useParams} from "react-router-dom";
import GroupDialogueBody from "./GroupDialogueBody.jsx";

const GroupDialogue = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const usersList = useUsers()
    const groups = useGroups()
    const params = useParams()


    const currentGroup = useMemo(() => {
        if(!groups) return {}
        return groups.find(it => it.id === params.id)
    }, [groups, params])


    const toggleGroupManager = useCallback(() => {
        setIsDrawerOpen(prev => !prev)
    }, [])

    return (
        <div className='flex w-full'>
            <div className='text-white bg-[#191919] flex-col flex relative w-full'>
                <GroupDialogueHeader groupName={currentGroup?.group_name} toggleGroupManager={toggleGroupManager} />
                <span className='border-b-neutral-600/40 border-b-2'/>

                <GroupDialogueBody currentGroup={currentGroup}/>
            </div>

            {isDrawerOpen && (
                <GroupManagerDrawer
                    toggleGroupManager={toggleGroupManager}
                    users={usersList}
                    method='UPDATE'
                    currentGroup={currentGroup}
                />
            )}
        </div>
    );
};

export default GroupDialogue;
