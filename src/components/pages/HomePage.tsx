import { Toaster } from "../ui/toaster"
import NavBar from "../NavBar"
import UsersQuickView from "../home/UsersQuickView"

function HomePage(){


    
    
    return (
        <div className="min-w-screen min-h-screen">
            <NavBar></NavBar>
            <main className="grid mt-4 grid-flow-row w-screen grid-cols-4 grid-rows-2 min-h-[80vh] gap-4 px-4 overflow-y-scroll overflow-x-hidden">
                <UsersQuickView/>
            </main>
        
            <Toaster/>
        </div>
    )
}

export default HomePage