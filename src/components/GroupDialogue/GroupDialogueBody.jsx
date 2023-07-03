import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../firebase-config.js";
import {useCallback, useMemo, useState} from "react";
import {toast} from "react-toastify";
import {doc, Timestamp, updateDoc} from "firebase/firestore";

const GroupDialogueBody = ({currentGroup}) => {

    const [user] = useAuthState(auth)

    const currentUserUid = useMemo(() => {
        return user?.uid
    }, [user])

    const [message, setMessage] = useState('')

    const onMessageChange = (event) => {
        setMessage(event.target.value)
    }

    const sendMessage = useCallback(async (event) => {
        event.preventDefault()

        try {
            const docRef = doc(db, 'groups', currentGroup?.id)
            await updateDoc(docRef, {
                messages: [
                    ...currentGroup.messages,
                    {
                        text: message,
                        timestamp: Timestamp.fromDate(new Date()),
                        uid: currentUserUid
                    }
                ]
            })
            setMessage('')
        } catch (error) {
            console.error(error)
            toast('Did not send message', {theme: 'dark'})
        }
    }, [currentGroup, message, currentUserUid])

    return (
        <div className='p-4 h-full flex flex-col'>
            <div className='flex flex-col gap-6 grow'>
                {(currentGroup?.messages || []).map((message) => (
                    <div
                        key={message.timestamp}
                        className={`w-fit flex px-5 py-4 rounded-lg ${message.uid === currentUserUid ? 'bg-blue-600 ml-auto' : 'bg-gray-600'}`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>

            <form className='relative mt-4'>
                <input
                    value={message}
                    onChange={onMessageChange}
                    type="text"
                    placeholder={`Message ${currentGroup?.group_name || ''}`}
                    className="bg-zinc-900 border border-zinc-700 text-zinc-400 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
                />
                <button
                    disabled={!message}
                    onClick={sendMessage}
                    className='bg-blue-900 text-zinc-200 disabled:bg-blue-900/40 disabled:text-zinc-400 rounded-lg px-3 py-1 absolute top-[5px] right-1'
                >
                    Send
                </button>
            </form>
        </div>
    );
};


export default GroupDialogueBody;
