import DialogueHeader from "./DialogueHeader.jsx";
import MessageBlock from "./MessageBlock.jsx";
import {useParams} from "react-router-dom";
import {useUsers} from "../../contexts/Users.jsx";
import {useCallback, useMemo, useState} from "react";
import GroupManagerDrawer from "../ManageGroup/GroupManagerDrawer.jsx";

const ChatDialogue = ({messages}) => {
    const params = useParams()
    const usersList = useUsers()

    const receiver = useMemo(() => {
        return usersList.find(user => user.id === params.id)
    }, [params, usersList])


    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const toggleGroupManager = useCallback(() => {
        setIsDrawerOpen(prev => !prev)
    }, [])

    return (
        <div className='flex w-full'>
            <div
                className={`text-white bg-[#191919] flex-col flex relative w-full`}>
                <DialogueHeader name={receiver?.name} photoUrl={receiver?.photoUrl}
                                toggleGroupManager={toggleGroupManager}/>
                <span className='border-b-neutral-600/40 border-b-2'/>
                <MessageBlock messages={messages}/>

            </div>
            {isDrawerOpen && <GroupManagerDrawer toggleGroupManager={toggleGroupManager} users={usersList} method='CREATE'/>}
        </div>
    );
};

export default ChatDialogue;
