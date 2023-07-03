import avatar from '../assets/images/avatar.jpeg'
import {AiFillStar} from "react-icons/ai";
import {NavLink} from "react-router-dom";
import {useCallback, useMemo} from "react";
import {toast} from "react-toastify";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../firebase-config.js";
import {doc, setDoc} from "firebase/firestore";
import {useFriends} from "../../contexts/Friends.jsx";

const CardItem = ({user: {isOnline, name, company, position, isFavorite = false, id}}) => {
    const [currentUser] = useAuthState(auth)
    const friends = useFriends()

    const friendsIds = useMemo(() => {
        return friends.map(it => ({uid: it.uid}))
    }, [friends])

    const toggleFavourite = useCallback(async (event) => {
        event.stopPropagation()

        if(isFavorite) {
            try {
                const docRef = doc(db, 'friends', currentUser.uid)
                await setDoc(docRef, {
                    uids: friendsIds.filter(it => it.uid !== id)
                }, {merge: true})
            } catch (error ){
                console.error(error)
                toast('Cannot remove from favorites')
            }
        } else {
            try {
                const docRef = doc(db, 'friends', currentUser.uid)
                await setDoc(docRef, {
                    uids: [...friendsIds, {uid: id}]
                }, {merge: true})
            } catch (error ){
                console.error(error)
                toast('Cannot add to favorites')
            }
        }

    }, [isFavorite, id, currentUser, friendsIds])

    return (
        <div className='relative basis-80'>
            <NavLink to={`/chat-dialogue/${id}`}
                     className='text-white text-sm bg-[#222222] flex gap-3 p-4 rounded-2xl  hover:cursor-pointer'>
                <img src={avatar} alt="avatar" className="w-20 rounded-full"/>
                <div>
                    <div className='flex gap-2 items-center'>
                        <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-600' : 'bg-gray-600'}`}/>
                        <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
                    </div>
                    <div>
                        {name}
                    </div>
                    <div className='text-zinc-400'>
                        {position}
                    </div>
                    <div className='text-zinc-400'>
                        {company}
                    </div>
                </div>
            </NavLink>
            <AiFillStar
                onClick={toggleFavourite}
                className={`absolute top-3 right-3 ${isFavorite ? 'text-white hover:text-gray-400' : 'text-gray-600 hover:text-gray-400'}`}
            />
        </div>
    );
};

export default CardItem;
