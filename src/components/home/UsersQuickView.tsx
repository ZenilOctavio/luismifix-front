import useUsers from "@/hooks/useUsers"
import { useEffect } from "react"
import CreateUserDialog from "../CreateUserDialog"

function UsersQuickView() {

    const { users, error, refreshUsers } = useUsers()

    useEffect(() => {

    }, [])

    useEffect(() => {
        console.log(error)
    },[error])

    const handleSubmit = () => {
        refreshUsers()
    }
    
    return (
        <>
            <ul>
                <CreateUserDialog onSubmit={handleSubmit}/>
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
        </>
    )
}
export default UsersQuickView