import { HistoricalDataTable } from "../historyInventory/HistoricalDataTable";
import NavBar from "../NavBar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function ProductsHistorical(){
    return (
        <div className="w-screen min-w-screen min-h-screen">
            <NavBar></NavBar>
            <main className="grid place-items-center w-screen">
                <Card className="w-content m-4">
                    <CardHeader>
                        <CardTitle>
                            Reportes de productos
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <HistoricalDataTable/>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
} 