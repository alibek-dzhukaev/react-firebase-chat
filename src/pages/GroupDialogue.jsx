import Layout from "../components/Layout.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import GroupDialogue from "../components/GroupDialogue/GroupDialogue.jsx";

const GroupDialoguePage = () => {
    return (
        <Layout>
            <section className='flex flex-row gap-x-4 h-full'>
                <Navbar/>
                <GroupDialogue/>
            </section>
        </Layout>
    );
};

export default GroupDialoguePage;
