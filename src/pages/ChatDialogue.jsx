import Layout from "../components/Layout.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import ChatDialogue from "../components/ChatDialogue/ChatDialogue.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../firebase-config.js";
import SignIn from "../components/auth/SignIn.jsx";
import {useEffect, useState} from "react";
import {query, collection, orderBy, onSnapshot, where} from 'firebase/firestore'
import {useParams} from "react-router-dom";

const ChatDialoguePage = () => {
    const [user] = useAuthState(auth)
    const params = useParams()

    const [messages, setMessages] = useState([])

    useEffect(() => {
        try {
            const q = query(
                collection(db, 'direct'),
                where('participants', 'array-contains-any', [user?.uid, params?.id]),
                orderBy('timestamp')
            )
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let messages = []
                querySnapshot.forEach(doc => {
                    console.log(doc.data())
                    messages = doc.data().messages.map(message => ({...message, id: doc.id}))
                })
                setMessages(messages)
            })

            return () => {
                unsubscribe()
            }
        } catch (error) {
            console.error(error)
        }
    }, [params.id, user])


    if(!user) {
        return <SignIn />
    }

    return (
        <Layout>
            <section className='flex flex-row gap-x-4 h-full'>
                <Navbar/>
                <ChatDialogue messages={messages}/>
            </section>
        </Layout>
    );
};

export default ChatDialoguePage;
