import { getUserById, getUserByUsername } from "@/services/users/getUser"
import { getUsers } from "@/services/users/getUsers"
import { User } from "@/types/users/User"
import { useEffect, useState } from "react"

function UsersQuickView() {
    const [users, setUsers] = useState<Array<never> | Array<User> >([])

    useEffect(() => {
        getUsers().then( newUsers => {
            setUsers(newUsers)
        })
        getUserById('66208c554cd642eb6da8066e').then( (user: User) => {
            console.log('User by id:',user)
        })

        getUserByUsername('Luismifix').then( (user: User) => {
            console.log('User by Username:',user)
        })
    }, [])
    
    return (
        <ul>
            { users.length ?
                users.map( user => {
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