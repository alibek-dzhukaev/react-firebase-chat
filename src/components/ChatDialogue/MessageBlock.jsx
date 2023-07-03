import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../firebase-config.js";
import {useCallback, useMemo, useState} from "react";
import {toast} from "react-toastify";
import {doc, setDoc, Timestamp, updateDoc} from 'firebase/firestore'
import {useParams} from "react-router-dom";
import {useUsers} from "../../contexts/Users.jsx";
import {v4 as uuid} from 'uuid'


const MessageBlock = ({messages}) => {
    const [user] = useAuthState(auth)
    const usersList = useUsers()
    const params = useParams()

    console.log(messages)

    const receiver = useMemo(() => {
        return usersList.find(({uid}) => uid === params.id)
    }, [usersList, params.id])

    const [message, setMessage] = useState('')
    const onMessageChange = (event) => {
        setMessage(event.target.value)
    }

    const currentUserUid = useMemo(() => {
        return user?.uid
    }, [user])

    const sendMessage = useCallback(async (event) => {
        event.preventDefault()
        const id = messages.at(0)?.id
        try {
            if(id) {
                const docRef = doc(db, 'direct', id)
                await updateDoc(docRef, {
                    messages: [...messages, {
                        from: currentUserUid,
                        text: message,
                        timestamp: Timestamp.fromDate(new Date()),
                        to: params.id
                    }]
                })
            } else {
                const data = {
                    messages: [{
                        from: currentUserUid,
                        text: message,
                        timestamp: Timestamp.fromDate(new Date()),
                        to: params.id
                    }],
                    receiverId: params.id,
                    senderId: currentUserUid,
                    timestamp: Timestamp.fromDate(new Date())
                }
                const id = uuid()
                await setDoc(doc(db, 'direct', id), data)
            }

            setMessage('')
        }catch (error) {
            console.error(error)
            toast('Error', {theme: 'dark'})
        }
    }, [messages, currentUserUid, message, params.id])

    return (
        <div className='px-3 py-5 flex flex-col h-full'>
            <div className='flex flex-col gap-6 grow'>
                {messages.map((message) => (
                    <div
                        key={message.timestamp}
                        className={`w-fit flex px-5 py-4 rounded-lg ${message.from === currentUserUid ? 'bg-blue-600 ml-auto' : 'bg-gray-600'}`}
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
                    placeholder={`Message ${receiver?.name || ''}`}
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

export default MessageBlock;
