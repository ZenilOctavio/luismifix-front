import { Toaster } from "../ui/toaster"
import NavBar from "../NavBar"
import UsersQuickView from "../home/UsersQuickView"
import ProvidersQuickView from "../home/ProvidersQuickView"

function HomePage(){


    
    
    return (
        <div className="min-w-screen min-h-screen">
            <NavBar></NavBar>
            <main className="grid mt-4 grid-flow-row w-screen grid-cols-4 grid-rows-2 min-h-[80vh] gap-4 px-4 overflow-y-scroll overflow-x-hidden">
                <UsersQuickView/>
                <ProvidersQuickView className="col-start-2 col-end-4"/>
            </main>
        
            <Toaster/>
        </div>
    )
}

export default HomePage