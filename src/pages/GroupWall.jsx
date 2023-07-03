import SignIn from "../components/auth/SignIn.jsx";
import Layout from "../components/Layout.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase-config.js";
import GroupsWall from "../components/GroupsWall/GroupsWall.jsx";

const GroupWallPage = () => {
    const [user] = useAuthState(auth)

    if(!user) {
        return <SignIn />
    }
    return (
        <Layout>
            <section className='flex flex-row gap-x-4'>
                <Navbar/>
                <GroupsWall/>
            </section>
        </Layout>
    );
};

export default GroupWallPage;
