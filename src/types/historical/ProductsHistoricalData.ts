interface Movement{
    _id: string
    nameMovementType: string
}

interface UserHistorical{
    _id: string
    username: string
}

interface ProductsHistorical{
    _id: string
    nameProduct: string
}

export interface ProductsHistoricalData{
    _id: string
    dateMovement: string
    idProduct: ProductsHistorical
    idMovementType: Movement
    idUser: UserHistorical
}