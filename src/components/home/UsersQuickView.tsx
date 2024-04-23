import useUsers from "@/hooks/useUsers"
import { useEffect } from "react"

function UsersQuickView() {

    const { users, error } = useUsers()

    useEffect(() => {

    }, [])

    useEffect(() => {
        console.log(error)
    },[error])

    
    return (
        <ul>
            { users ?
                users.map( user => {
                    
                    if (user)
                    return (
                        <li key={user._id}>{user.username}</li>
                    )
                })
                :
                <li>No users</li>
            }
        </ul>
    )
}
export default UsersQuickView