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
            <DropdownMenuTrigger className="aspect-square rounded-full border-primary border bg-background">
                <span className="flex justify-center items-center  p-0 bg-transparent border-none">
                    {
                        (theme == 'light')? 
                            <SunDim size={20} /> 
                        : 
                            (theme == 'dark')?
                                <LucideMoonStar size={20}/>
                            :
                            <CloudCogIcon size={20} />
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