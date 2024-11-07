import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  username: z.string().min(4, {
    message: "El nombre de usuario debe de ser de al menos 4 caracteres.",
  }).max(50, 'El nombre de usuario no puede tener mas de 50 caracteres'),
  password: z.string().min(8, {
    message: "La contraseña debe de ser de al menos 8 caracteres",
  }).max(50, 'La contraseña no puede tener mas de 50 caracteres'),
  email: z.string().email({
    message: "Email inválido",
  }).max(320, 'El email no puede tener mas de 320 caracteres'),
  confirmPassword: z.string()
})

export function RegisterPage() {


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    if (data.confirmPassword != data.password) {
      form.setError('confirmPassword', {
        message: 'Las contraseñas no coinciden'
      })
      return
    }
  }

  return (
    <div className="bg-gradient-to-t to-cyan-500 from-blue-500 w-screen  min-h-screen grid place-items-center">
      <main className="bg-white dark:bg-gray-800 p-8 rounded-sm flex flex-col gap-4 md:w-[400px]">
        <header className="flex flex-col items-center justify-center gap-4">
          <figure className="w-28">
            <img src="../../../public/logo_luismifix.png" className="w-full h-full object-cover" />
          </figure>
          <h1 className="text-3xl font-semibold text-center">Crear cuenta</h1>
        </header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input maxLength={51} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input maxLength={321} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input maxLength={51} type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input maxLength={51} type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />



            <Button type="submit">Crear cuenta</Button>
          </form>
        </Form>
      </main>
    </div>
  )
}