export interface Products {
    id: string
    image: string
    productName: string
    description: string
    facts: string[]
    price: number
    quantity: number 
}

export interface CartItem {
    // ogProduct: Products
    id: string
    image: string
    productName: string
    description: string
    facts: string[]
    price: number
    quantity: number
    cartQuantity: number
}