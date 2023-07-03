import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import {ToastContainer} from 'react-toastify';
import {UsersProvider} from "../contexts/Users.jsx";
import {FriendsProvider} from "../contexts/Friends.jsx";

import 'react-toastify/dist/ReactToastify.css';
import {GroupProvider} from "../contexts/Groups.jsx";

const Layout = ({children}) => {
    return (
        <UsersProvider>
            <FriendsProvider>
                <GroupProvider>
                    <div className='flex flex-col bg-[#111111]'>
                        <Header/>
                        <div className='flex flex-row'>
                            <Sidebar/>
                            <main className='m-4 grow'>
                                {children}
                            </main>
                        </div>
                        <ToastContainer/>
                    </div>
                </GroupProvider>
            </FriendsProvider>
        </UsersProvider>
    );
};

export default Layout;
