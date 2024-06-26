import { useTheme, Theme } from "@/providers/ThemeProvider"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { LucideMoonStar, SunDim, CloudCogIcon } from "lucide-react"

interface ThemeObject {
    name: string,
    value: Theme
}

function ThemeButton() {
    
    const {theme, setTheme} = useTheme()
    
    const themes: Array<ThemeObject> = [
        {
            name: "System",
            value: "system"
        },
        {
            name: "Light",
            value: "light"
        },
        {
            name: "Dark",
            value: "dark"
        },
    ]
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="aspect-square rounded-full border-primary border bg-background">
                <span className="md:flex justify-center items-center  p-0 bg-transparent border-none hover:cursor-pointer hover:scale-105 transition-transform hidden">
                    {
                        (theme == 'light')? 
                            <SunDim /> 
                        : 
                            (theme == 'dark')?
                                <LucideMoonStar/>
                            :
                            <CloudCogIcon/>
                    }
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Select theme</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                
                {themes.map( themeObject => {
                    return (                        
                        <DropdownMenuCheckboxItem
                            key={themeObject.value} 
                            checked={themeObject.value == theme} 
                            onCheckedChange={() => {
                            setTheme(themeObject.value)
                        }}>
                            {themeObject.name}
                        </DropdownMenuCheckboxItem>
                    )
                } )}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ThemeButton