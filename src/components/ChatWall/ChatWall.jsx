import ChatList from "./ChatList.jsx";
import {useMemo} from "react";
import ChatBlock from "./ChatBlock.jsx";
import {useUsers} from "../../contexts/Users.jsx";
import {useFriends} from "../../contexts/Friends.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebase-config.js";

const ChatWall = () => {
    const usersList = useUsers()
    const friends = useFriends()

    const [user] = useAuthState(auth)

    const users = useMemo(() => {
        const friendsIds = friends.map(({uid}) => uid)
        return usersList.reduce((acc, currentValue) => {
            if(user.uid === currentValue.uid) {
                return  acc
            }

            if(friendsIds.includes(currentValue.uid)) {
                acc.myOrganization.push({...currentValue, isFavorite: true})
            } else {
                acc.otherUsers.push(currentValue)
            }
            return acc
        }, {myOrganization: [], otherUsers: []})
    }, [friends, user.uid, usersList])


    return (
        <div className='w-full bg-[#191919] rounded-xl'>
           <ChatList>
              <div className='flex flex-col gap-4'>
                  <ChatBlock users={users.myOrganization} type='MY ORGANIZATION'/>
                  <span className='border-b-neutral-600/40 border-b-2'/>
                  <ChatBlock users={users.otherUsers} type='OTHER USERS'/>
              </div>
           </ChatList>
        </div>
    );
};

export default ChatWall;
