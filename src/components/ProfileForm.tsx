import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { authenticate, ResponseLoginJson } from "@/services/auth"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 8 characters.",
  })
})

export function ProfileForm({onSubmit}: {onSubmit: Function | undefined}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  async function handleSubmit(data: z.infer<typeof FormSchema>) {
    try{
      const responseData = await authenticate(data.username, data.password)
      toast({
        title: "Success",
        description: responseData.message,
        variant: 'default',
      })
      onSubmit?.(responseData)
    }
    catch(error){
      const response = error as ResponseLoginJson

      toast({
        title: "Failure",
        description: response.message,
        variant: 'destructive',  
      })
          
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your password" {...field} />
              </FormControl>
              <FormDescription>
                This is your private password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
