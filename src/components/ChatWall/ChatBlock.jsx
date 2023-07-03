import CardItem from "./CardItem.jsx";
import {AiOutlineDown} from "react-icons/ai";

const ChatBlock = ({users, type}) => {
    return (
        <div>
            <h5 className='text-zinc-400 flex gap-1 items-center mt-3'>
                <AiOutlineDown/>{type}
            </h5>

            <div className='flex flex-row gap-3 flex-wrap mt-5'>
                {users.map(user => <CardItem key={user.id} user={user}/>)}
            </div>
        </div>
    );
};

export default ChatBlock;
