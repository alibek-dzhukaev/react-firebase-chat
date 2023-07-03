import ChatHeader from "./ChatHeader.jsx";

const ChatList = ({children}) => {
    return (
        <div className='flex flex-col w-full'>
            <ChatHeader/>
            <span className='border-b-neutral-600/40 border-b-2'/>
            <section className='px-3 py-5'>
                {children}
            </section>
        </div>
    );
};

export default ChatList;
