import {AiOutlineSearch, AiOutlineUsergroupAdd} from "react-icons/ai";
import avatar from "../assets/images/avatar.jpeg";

const GroupDialogueHeader = ({toggleGroupManager, groupName}) => {
    return (
        <div className='flex flex-row justify-between px-3 py-5'>
            <div className='relative'>
                <AiOutlineSearch className='text-gray-500 absolute top-1.5 left-1.5'/>
                <input type="text" className='appearance-none bg-black rounded-2xl p-1 text-sm text-center text-white' placeholder='Search All Users'/>
            </div>
            <div className='flex gap-1 items-center'>
                <img src={avatar} alt="avatar" className='w-8 rounded-xl'/>
                <h4>{groupName}</h4>
            </div>
            <AiOutlineUsergroupAdd
                size={26}
                onClick={toggleGroupManager}
                className='text-white hover:text-gray-400 hover:cursor-pointer'
            />
        </div>
    );
};

export default GroupDialogueHeader;
