import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../firebase-config.js";

const FriendsContext = createContext()
export const useFriends = () => useContext(FriendsContext)

export const FriendsProvider = ({children}) => {
    const [friends, setFriends] = useState([])

    const fetchFriends = useCallback(() => {
        try {
            const q = query(collection(db, `friends` ))

            return onSnapshot(q, querySnapshot => {
                let friends = []
                querySnapshot.forEach(doc => {
                    friends = friends.concat(doc.data().uids)
                })

                setFriends(friends)
            })
        } catch (error) {
            toast(error.message, {theme: 'dark'})
        }
    }, [])

    useEffect(() => {
        const unsubscribe = fetchFriends()

        return () => {
            unsubscribe && unsubscribe()
        }
    }, [fetchFriends])


    return (
        <FriendsContext.Provider value={friends}>
            {children}
        </FriendsContext.Provider>
    )
}


