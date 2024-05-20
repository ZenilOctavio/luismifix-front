import useProducts from "@/hooks/useProducts";
import { CreationPurchase, Purchase } from "@/types/purchases/Purchase";
import { Link, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { moneyFormat, turnFormattedMoneyStringToNumber } from "@/lib/formating";


export function LinkItem({purchase, key}: {purchase: Purchase, key: string | number}) {

    const { createPurchase, enablePurchase, disablePurchase, updatePurchase } = useProducts()
    const [editingPrice, setEditingPrice] = useState<boolean>(false)
    const [editingProvider, setEditingProvider] = useState<boolean>(false)
    const [price, setPrice] = useState(moneyFormat(purchase.priceProduct))
    
    const handleDoubleProviderDoubleClick = () => {

    }

    const handleDoublePriceClick = () => {
        setEditingPrice(true)
    }

    const priceInput = <Input 
                            value={price} 
                            className="w-20" 
                            autoFocus 
                            onChange={(e) => {
                                const numberPrice = turnFormattedMoneyStringToNumber(e.target.value)
                                setPrice(moneyFormat(numberPrice.toString()))
                            }}
                            onBlur={() => {
                                setEditingPrice(false)
                                if(turnFormattedMoneyStringToNumber(price) == +purchase.priceProduct) return false

                                console.log(purchase)


                                const newPurchaseData: CreationPurchase = {
                                    idProduct: purchase.idProduct,
                                    idProvider: purchase.idProvider._id,
                                    priceProduct: turnFormattedMoneyStringToNumber(price),
                                    linkProvider: purchase.linkProvider
                                }
                                
                                updatePurchase(purchase, newPurchaseData)
                                .then(() => {
                                    toast({
                                        title: "Precio actualizado",
                                        description: `Nuevo precio: ${price}`
                                    })
                                })
                                .catch(() => {
                                    setPrice(moneyFormat(purchase.priceProduct))
                                    toast({
                                        title: "No se pudo actualizar el precio",
                                        variant: 'destructive'
                                    })
                                })

                            }}
                        />
    
    return (
        <li className="shadow-sm flex items-center gap-2 pl-2 relative h-12" key={key}>
            <h6 className="font-bold border-r-2 pr-3" onDoubleClick={handleDoubleProviderDoubleClick}>{purchase.idProvider.nameProvider}</h6>
            {
                editingPrice?
                priceInput
                :
                <span onClick={handleDoublePriceClick}>{price}</span>
            }
            <button className="bg-white absolute right-20">
                <Trash2 className="text-red-400"/>
            </button>
            <button className="bg-white text-blue-500 dark:bg-slate-900 group flex justify-center gap-2 overflow-hidden transition-all absolute right-0">
                <Link/>
                <a href={purchase.linkProvider} target="_blank" className="group-hover:w-full w-0 overflow-hidden transition-all">{purchase.linkProvider}</a>
            </button>

        </li>
    )
}