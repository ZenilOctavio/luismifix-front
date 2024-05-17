import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle, CardHeader } from "../ui/card"
import useProviders from "@/hooks/useProviders"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useEffect } from "react"


export default function ProvidersQuickView({className}: {className?: string}){

    const { providers, providersContacts, refreshAllProvidersContacts } = useProviders()

    console.log(providersContacts)

    useEffect(() => {
        refreshAllProvidersContacts()
    }, [providers])

    return (
        <>
        <Card className={className? className: ''}>
            <CardHeader>
                <CardTitle className="text-xl">Providers</CardTitle>
                <CardDescription>Providers registered in the platform</CardDescription>
            </CardHeader>
            <CardContent className="">
            <ul className="flex-col">
                { providers ?
                    providers.map( currentProvider => {
                        
                        return (
                            <li className="p-4 border-b-2 flex items-center gap-7 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors overflow-hidden text-ellipsis" key={currentProvider._id}>
                                <Avatar className="w-8 h-8 hidden sm:block">
                                   <AvatarFallback asChild><span className="text-sm">{currentProvider.nameProvider.slice(0,2).toUpperCase()}</span></AvatarFallback> 
                                </Avatar>
                                <span className="tracking-wide text-sm  text-ellipsis overflow-hidden">{currentProvider.nameProvider}</span>
                                
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <Button variant="outline" className="ml-auto rounded">Ver contactos</Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto">
                                        <div>          
                                                {
                                                   providersContacts && providersContacts[currentProvider._id] && providersContacts[currentProvider._id].length?
                                                        <>
                                                            <h3 className="font-semibold mb-4">Contactos</h3>
                                                            <ul className="flex flex-col gap-4">
                                                            { providersContacts[currentProvider._id].map(contact => {
                                                                return (
                                                                    <li className="flex items-center gap-2">
                                                                        {/* <Avatar>
                                                                            <AvatarFallback asChild><span className="text-sm">ER</span></AvatarFallback>
                                                                        </Avatar> */}
                                                                        <span className="text-sm font-semibold grow px-2">{contact.idTypeContact.nameTypeContact}</span>
                                                                        <div className="border border-slate-400 rounded-sm p-2">
                                                                            <span className="underline">{contact.data}</span>
                                                                        </div>
                                                                        {/* <div className="border border-slate-400 rounded-sm p-2">
                                                                            <span className="underline pb-1">+52 662 167 8480</span>
                                                                        </div> */}
                                                                    </li>
                                                                )
                                                            })}
                                                            </ul>
                                                        </>
                                                        :
                                                        <div>No Contacts to show</div>
                                                }

                                        </div>
                                    </PopoverContent>
                                </Popover>
                                
                            </li>
                        )
                    })
                    :
                    <li>No users</li>
                }
            </ul>
            </CardContent>
            <CardFooter><span className="text-[0.8rem] text-slate-500">Go to Providers page for more information</span></CardFooter>
        </Card>            
        </>
    )
} 
