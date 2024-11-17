import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input, PasswordInput } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/providers/AuthProvider"
import { CheckCheck, BadgeAlert } from "lucide-react"


const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 8 characters.",
  })
})

export function ProfileForm({ onSubmit, className }: { onSubmit: () => void | undefined, className: string | undefined }) {
  const { signup } = useAuth()


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  async function handleSubmit(data: z.infer<typeof FormSchema>) {

    const loginResponseData = await signup(data.username, data.password)

    console.log(loginResponseData)

    if (loginResponseData.user) {
      toast({
        title: 'Inicio de sesión exitoso',
        content: loginResponseData.message,
        description:
          <span className="flex items-center gap-2">
            <CheckCheck size={16} />
            <span>{loginResponseData.message}</span>
          </span>
      })
      if (onSubmit) onSubmit()

    }
    else {
      toast({
        title: "Inicio de sesión fallido",
        description:
          <span className="flex items-center gap-2">
            <BadgeAlert size={16} />
            <span>{loginResponseData.message}</span>
          </span>,
        variant: 'destructive',
      })
    }

    // try{
    //   const responseData = await signup(data.username, data.password)


    //   console.log(responseData)
    //   toast({
    //     title: 'Log in completed',
    //     content: responseData.message,
    //     description: 
    //     <span className="flex items-center gap-2">
    //         <CheckCheck size={16} />
    //         <span>{responseData.message}</span>
    //     </span>
    // })

    //   if (onSubmit) onSubmit()
    // }
    // catch(error){
    //   const response = error as SessionResponse

    //   toast({
    //     title: "Log in failed",
    //     description:
    //     <span className="flex items-center gap-2">
    //       <BadgeAlert size={16} />
    //       <span>{response.message}</span>
    //   </span>,
    //     variant: 'destructive',  
    //   })

    // }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        height: '100%',
      }}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="sm:text-lg text-sm">Usuario</FormLabel>
              <FormControl>
                <Input maxLength={50} placeholder="Tu nombre de usuario" {...field} className="rounded-sm h-12 shadow-lg" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="sm:text-lg text-sm">Contraseña</FormLabel>
              <FormControl>
                <PasswordInput maxLength={50} placeholder="Tu contraseña" {...field} className="rounded-sm h-12 shadow-lg" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-auto text-white dark:text-foreground bg-slate-900  max-w-24 self-center rounded-sm text-lg font-normal px-4 py-6 shadow-md dark:shadow-none shadow-slate-400">Entrar</Button>
      </form>
    </Form>
  )
}
