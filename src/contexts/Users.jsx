import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../firebase-config.js";
import {toast} from "react-toastify";

const UsersContext = createContext()
export const useUsers = () => useContext(UsersContext)

export const UsersProvider = ({children}) => {
    const [usersList, setUsersList] = useState([])

    const fetchUsers = useCallback(() => {
        try {
            const q = query(collection(db, 'users'))

            return onSnapshot(q, querySnapshot => {
                let users = []
                querySnapshot.forEach(doc => {
                    users[users.length] = {...doc.data(), id: doc.id}
                })

                setUsersList(users)
            })

        } catch (error) {
            toast(error.message, {theme: 'dark'})
        }
    }, [])

    useEffect(() => {
        const unsubscribe = fetchUsers()

        return () => {
            unsubscribe()
        }
    }, [fetchUsers])


    return (
        <UsersContext.Provider value={usersList}>
            {children}
        </UsersContext.Provider>
    )
}


