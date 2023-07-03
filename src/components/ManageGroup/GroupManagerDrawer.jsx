import {AiOutlineClose} from "react-icons/ai";
import avatar from '../assets/images/avatar.jpeg'
import {useCallback, useEffect, useId, useMemo, useState} from "react";
import {toast} from "react-toastify";
import {doc, setDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "../../firebase-config.js";
import {v4 as uuid} from 'uuid'
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate, useParams} from "react-router-dom";

const GroupManagerDrawer = ({toggleGroupManager, users, method = 'CREATE', currentGroup = null}) => {
    const id = useId()
    const navigate = useNavigate()
    const [user] = useAuthState(auth)
    const params = useParams()

    const [groupName, setGroupName] = useState('')
    const onChange = (event) => {
        setGroupName(event.target.value)
    }

    const [isPrivate, setIsPrivate] = useState(false)
    const onChangePrivateHandler = (event) => {
        setIsPrivate(event.target.checked)
    }

    const [chosenUsers, setChosenUsers] = useState([])

    useEffect(() => {
        if(method === "CREATE") {
            chosenUsers[chosenUsers.length] = params.id
        }
    }, [params.id, method])

    useEffect(() => {
        if(currentGroup || !user.uid) {
            setGroupName(currentGroup.group_name)
            setIsPrivate(currentGroup.isPrivate)
            setChosenUsers(() => currentGroup.participants.filter(it => it !== user?.uid))
        }
    }, [currentGroup, user.uid])


    const createGroup = useCallback(async () => {

        if(!groupName) {
            toast('Enter group name', {theme: 'dark'})
            return
        }

        if(!chosenUsers.length) {
            toast('Choose users', {theme: 'dark'})
            return
        }

        try {
            const docId = uuid()
            const docRef = doc(db, 'groups', docId)

            await setDoc(docRef, {
                group_name: groupName,
                participants: [...chosenUsers, user?.uid],
                messages: [],
                isPrivate
            })
            navigate(`/group-dialogue/${docId}`)
        } catch (error) {
            toast(error.message, {theme: 'dark'})
        }
    }, [chosenUsers, user?.uid, groupName, isPrivate])

    const updateGroup = useCallback(async () => {
        if(!groupName) {
            toast('Enter group name', {theme: 'dark'})
            return
        }

        if(!chosenUsers.length) {
            toast('Choose users', {theme: 'dark'})
            return
        }

       try {
            const id = params.id
           const docRef = doc(db, 'groups', id)

           await updateDoc(docRef, {
               group_name: groupName,
               participants: [...chosenUsers, user?.uid],
               isPrivate
           })

           toast('Group Updated', {theme: 'dark'})
       } catch (error ){
            toast('error while updating group', {theme: 'dark'})
       }

    }, [currentGroup, chosenUsers.length, groupName])

    const manageGroup = useCallback(async () => {
        if(method === 'CREATE') {
          await createGroup()
        } else {
            updateGroup()
        }
    }, [method, createGroup, updateGroup])

    const toggleUser = useCallback((uid) => {
        setChosenUsers(prevState =>
            !prevState.includes(uid)
                ? [...prevState, uid]
                : prevState.filter(id => id !== uid)
        )
    }, [])

    const usersToDisplay = useMemo(() => {
        return users.filter(it => it.uid !== user.uid)
    }, [users, user.uid])


    return (
        <div
            className='bg-[#191919] h-full px-3 py-5 flex flex-col gap-3.5 border-l-2 border-l-neutral-600/40 w-72'
        >
            <div className='flex justify-between py-2'>
                <h4 className='text-white text-sm'>Create Group</h4>
                <AiOutlineClose onClick={toggleGroupManager} className='text-white cursor-pointer'/>
            </div>
            <span className='border-b-neutral-600/40 border-b-2'/>
            <div>
                <input
                    value={groupName}
                    onChange={onChange}
                    type="text"
                    placeholder='Group Name'
                    className="bg-zinc-900 border border-zinc-700 text-zinc-400 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
                />

                <div className='mt-4 flex flex-col gap-3.5'>
                    {usersToDisplay.map(user => <User key={user.uid} user={user} toggleUser={toggleUser} isChosen={chosenUsers.includes(user.uid)}/>)}
                </div>
            </div>

            <div className='flex flex-col gap-3.5 mt-auto'>
                <label htmlFor={id} className='text-white text-sm flex gap-2 select-none'>
                    <input type="checkbox" id={id} checked={isPrivate} onChange={onChangePrivateHandler}/>
                    Private Group
                </label>
                <button
                    onClick={manageGroup}
                    className='text-white bg-blue-900 disabled:bg-blue-900/40 w-full py-1 hover:bg-blue-800'
                >{method === 'CREATE' ? 'Create Group' : 'Update Group'}</button>
            </div>
        </div>
    );
};

const User = ({user, toggleUser, isChosen}) => {
    return (
        <div onClick={toggleUser.bind(null, user.uid)} className={`flex gap-1.5 items-center cursor-pointer ${isChosen ? 'bg-gray-500 rounded-lg' : ''}`}>
            <img className='w-8' src={avatar} alt="avatar"/>
            <span className='text-white text-sm'>{user.name}</span>
        </div>
    )
}

export default GroupManagerDrawer;
