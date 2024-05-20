import useProducts from "@/hooks/useProducts";
import { CreationPurchase, Purchase } from "@/types/purchases/Purchase";
import { Link, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { isValidUrl, moneyFormat, turnFormattedMoneyStringToNumber } from "@/lib/formating";

export function LinkItem({purchase, key}: {purchase: Purchase, key: string | number}) {

    const { createPurchase, enablePurchase, disablePurchase, updatePurchase } = useProducts()
    
    const [editingPrice, setEditingPrice] = useState<boolean>(false)
    const [price, setPrice] = useState(moneyFormat(purchase.priceProduct))

    const [editingLink, setEditingLink] = useState<boolean>(false)
    const [link, setLink] = useState<string>(purchase.linkProvider)
    
    const handlePriceClick = () => {
        setEditingPrice(true)
    }

    const handleLinkClick = () => {
        setEditingLink(true)
    }

    const sendUpdatePrice = () => {
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

    }
    const sendUpdateLink = () => {
        if (link == purchase.linkProvider) return false
        setEditingLink(false)

        if(!isValidUrl(link)){
            toast({
                title: 'No es una url válida',
                description: link
            })
            return false
        }

        const newPurchaseData: CreationPurchase = {
            idProduct: purchase.idProduct,
            idProvider: purchase.idProvider._id,
            priceProduct: turnFormattedMoneyStringToNumber(price),
            linkProvider: link
        }

        updatePurchase(purchase, newPurchaseData)
        .then(
            () => {
                toast({
                    title: 'Link actualizado',
                    description: `Nuevo link: ${link}`
                })

            }
        )
        .catch(
            () => {
                toast({
                    title: 'No se pudo actualizar el link',
                    variant: 'destructive'
                })
                setLink(purchase.linkProvider)
            }
        )
    }

    const handleDeletePurchase = () => {
        disablePurchase(purchase)
        .then(() => {
            toast({
                title: 'Opcion de compra eliminada',
            })
        })
        .catch(() => {
            toast({
                title: 'No se pudo eliminar la opcion de compra',
                variant: 'destructive'
            })
        })
    }

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>, callback: Function) => {
        if (event.key === 'Enter') callback()

    }


    const priceInput = (
        <Input 
            value={price} 
            className="w-20" 
            autoFocus 
            onChange={(e) => {
                const numberPrice = turnFormattedMoneyStringToNumber(e.target.value)
                setPrice(moneyFormat(numberPrice.toString()))
            }}
            onBlur={sendUpdatePrice}
            onKeyDown={(e) => {handleEnter(e, sendUpdatePrice)}}
        />
    )

    const linkInput = (
        <Input
            className="w-72"
            value={link}
            autoFocus
            onChange={(e) => setLink(e.target.value)}
            onBlur={sendUpdateLink}
            onKeyDown={(e) => {handleEnter(e, sendUpdateLink)}}
            
        />
    )
    
    return (
        <li className="shadow-sm flex items-center gap-2 pl-2 relative h-12" key={key}>
            <h6 className="font-bold border-r-2 pr-3">{purchase.idProvider.nameProvider}</h6>
            {
                editingPrice?
                priceInput
                :
                <span onClick={handlePriceClick}>{price}</span>
            }
            <button 
                className="bg-white absolute right-20"
                onClick={handleDeletePurchase}
            >
                <Trash2 className="text-red-400"/>
            </button>
            <button className="bg-white text-blue-500 dark:bg-slate-900 group flex items-center justify-center gap-2 overflow-hidden transition-all absolute right-0">
                <Link onClick={handleLinkClick}/>
                {
                    editingLink?
                    linkInput
                    :
                    <a href={purchase.linkProvider} target="_blank" className="group-hover:w-full w-0 overflow-hidden transition-all">{link}</a>
                }
            </button>

        </li>
    )
}