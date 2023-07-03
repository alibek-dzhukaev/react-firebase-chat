import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../firebase-config.js";

const GroupsContext = createContext()

export const useGroups = () => useContext(GroupsContext)

export const GroupProvider = ({children}) => {
    const [groups, setGroups] = useState([])


    const fetchGroups = useCallback(() => {
        try {
            const q = query(
                collection(db, 'groups')
            )

            return onSnapshot(q, querySnapshot => {
                let groups = []
                querySnapshot.forEach(doc => {
                    groups.push({...doc.data(), id: doc.id})
                })

                setGroups(groups)
            })
        } catch (error) {
            toast(error.message, {theme: 'dark'})
        }
    }, [])

    useEffect(() => {
        const unsubscribe = fetchGroups()

        return () => {
            unsubscribe()
        }
    }, [fetchGroups])

    return (
        <GroupsContext.Provider value={groups}>
            {children}
        </GroupsContext.Provider>
    )
}
