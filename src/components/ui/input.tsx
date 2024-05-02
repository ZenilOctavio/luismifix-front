import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff} from 'lucide-react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface PasswordInputProps extends InputProps {
  suffix?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, suffix, ...props }, ref) => {

    const [isPasswordVisible, setPasswordVisible] = React.useState<boolean>(false)
    return (
      <div className="flex items-center relative">
        <input 
          type={ isPasswordVisible? 'text' : 'password' }
          
          className={
            cn('flex h-10 w-full grow rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )
          } 
          {...props}  
          ref={ref} 
        />
        <button 
          className="p-0 bg-transparent outline-none border-none focus:outline-none absolute right-4" 
          onClick={() => {setPasswordVisible(!isPasswordVisible)}}
          type="button"
        >
          {isPasswordVisible? <Eye/> : <EyeOff/>}
        </button>
      </div>
    )
  }
)
Input.displayName = "Input"
PasswordInput.displayName = "PasswordInput"

export { Input, PasswordInput }
