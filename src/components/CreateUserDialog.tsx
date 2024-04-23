import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogDescription, DialogTitle  } from "./ui/dialog"
import { Button } from "./ui/button"
import { Form ,FormControl, FormField, FormLabel, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"
import useUserTypes from "@/hooks/useUserTypes"
import { ReactNode } from "react"
import useUsers from "@/hooks/useUsers"
import { toast } from "./ui/use-toast"

/**
 * Renders a dialog for creating a new user.
 */

const createUserFormSchema = z.object({
    email: z.string().email('Use a valid email'),
    username: z.string().min(4, 'Username must be at least 4 characters long'),
    password: z.string().min(4, 'Password must be at least 8 characters long').regex(/[A-Z]/, 'Password must contain at least one uppercase character'),
    typeUser: z.string()
})

function CreateUserDialog({ trigger, onSubmit }: {trigger?: ReactNode, onSubmit?: Function }) {

    const {userTypes} = useUserTypes()
    const { registerNewUser, error, refreshUsers } = useUsers()

    const form = useForm<z.infer<typeof createUserFormSchema>>({
        resolver: zodResolver(createUserFormSchema),
        defaultValues: {
            email: '',  
            username: '',
            password: '',
            typeUser: ''
        }    
    })

    const handleSubmit = async (data: z.infer<typeof createUserFormSchema>) => {
        console.log(data)
        const user = await registerNewUser(data)

        if (error || !user){
            toast({
                title: 'Couldn`t create the user',
                description: <span>{error}</span>,
                variant: 'destructive'
            })

            return
        }

        toast({
            title: 'New user created',
            description: <span>{user.username}</span>,
        })

        setTimeout(() => {
            refreshUsers()
        }, 2000)

        onSubmit? onSubmit(data): null
        
        form.reset()

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
            {trigger ? trigger : <Button variant='outline'>Create User</Button>}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new user</DialogTitle>
                    <DialogDescription>Create your new user here</DialogDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="bg-200-red flex flex-col gap-4 py-8">
                            <FormField
                                name="username"
                                control={form.control}
                                render = {({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Enter the username" {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                }}
                            />
                            <FormField
                                name="email"
                                control={form.control}
                                render = {({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="Enter the email" {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                }}
                            />

                            <FormField
                                name="typeUser"
                                control={form.control}
                                render = {({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Type of User</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the user type" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                {
                                                    userTypes?
                                                        userTypes.map(userType => (
                                                            <SelectItem key={userType} value={userType}>{userType}</SelectItem>
                                                        ))
                                                        :
                                                        <></>
                                                }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                            <FormField
                                name="password"
                                control={form.control}
                                render = {({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter the password" {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                }}
                            />
                            <button className="mt-10 text-white ">Create</button>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreateUserDialog