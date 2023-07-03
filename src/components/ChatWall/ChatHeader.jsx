import {AiOutlineSearch} from "react-icons/ai";
import {IoFilterSharp} from "react-icons/io5";

const ChatHeader = () => {
    return (
        <div className='flex flex-row justify-between px-3 py-5'>
            <div className='relative'>
                <AiOutlineSearch className='text-gray-500 absolute top-1.5 left-1.5'/>
                <input type="text" className='appearance-none bg-black rounded-2xl p-1 text-sm text-center text-white' placeholder='Search All Users'/>
            </div>
            <h4 className='text-white font-bold'>All Users</h4>
            <div className='text-white flex gap-1 items-center'>
                <IoFilterSharp/> Filters
            </div>
        </div>
    );
};

export default ChatHeader;
