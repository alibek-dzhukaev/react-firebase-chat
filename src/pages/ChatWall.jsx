import Layout from "../components/Layout.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import ChatWall from "../components/ChatWall/ChatWall.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase-config.js";
import SignIn from "../components/auth/SignIn.jsx";

const ChatWallPage = () => {
    const [user] = useAuthState(auth)

    if(!user) {
        return <SignIn />
    }
    return (
        <Layout>
            <section className='flex flex-row gap-x-4'>
                <Navbar/>
                <ChatWall/>
            </section>
        </Layout>
    );
};

export default ChatWallPage;
