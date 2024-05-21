import { Toaster } from "../ui/toaster"
import NavBar from "../NavBar"
import UsersQuickView from "../home/UsersQuickView"
import ProvidersQuickView from "../home/ProvidersQuickView"
import { useEffect } from "react"
import { getAllProductsHistoricalData } from "@/services/historical/getProductsHistorical"

function HomePage(){


    useEffect(() => {
        getAllProductsHistoricalData().then(historicalData => {console.log(historicalData)})
    },[])
    
    return (
        <div className="min-w-screen min-h-screen">
            <NavBar></NavBar>
            <main className="flex flex-col lg:grid mt-4 grid-flow-col  w-screen grid-cols-3 grid-rows-3 min-h-[80vh] gap-4 px-4 overflow-y-scroll overflow-x-hidden">
                <UsersQuickView/>
                <ProvidersQuickView className="col-start-2 col-end-4"/>
            </main>
        
            <Toaster/>
        </div>
    )
}

export default HomePage