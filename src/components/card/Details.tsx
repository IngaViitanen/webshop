import React, { useState, useContext } from "react";
import { CartItem, Products } from "../../models/Products";
import {MyGlobalContext} from '../../context/Context'
import './details.css'

interface Props{
    details: Products
    id: string
    updateProduct: (updated: Products) => void
    item: CartItem
}

const Details = ({details, item, updateProduct, id}: Props) => {
    const [detail, setDetail] = useState(details)
    const {cart, setCart} = useContext(MyGlobalContext)
    const {products, setProducts} = useContext(MyGlobalContext)
    const [cartArray, setCartArray] = useState<CartItem[]>([])
    // const [cartitem, setCartitem] = useState<CartItem>()
    // const citem = {...detail, cartQuantity: 1}


    const addToCart = (cartitem: CartItem) => { // CartItem ?
        // console.log(updProd[prodIndex])
        
        if(cart !== undefined){

             
             
            //  const cartitemCopy = {...cartitem, cartQuantity: +1}
            //  console.log('CARTITEMCOPY::::::', cartitemCopy)

            //  setCart((cartArray: CartItem[]) => {
            const productCopy = {...details, quantity: details.quantity -1}

            const storeCartItem = {...detail, cartQuantity: +1, quantity: detail.quantity -1}

            const newCartArr = [...cart, storeCartItem]
            console.log('newCartArr', newCartArr)
           

            const isItemInCart = cart?.find((cart:any) => cart.id === detail.id ) 
            console.log(isItemInCart)

                if(!isItemInCart){
                    setCart(newCartArr)
                    storeCart(storeCartItem)
                    setDetail(productCopy)
                    updateProduct(productCopy)
                    updateStorage(productCopy)
                    console.log('new item in cart')
                } else if(isItemInCart){
                    console.log('found matching item')
                    setCart(() => {
                       return cart?.map((cart:any) => cart.id === detail.id ? {...cart, cartQuantity: cart.cartQuantity +1} : cart) 
                    })
                    storeCart({...cart, cartQuantity: cart.cartQuantity +1, quantity: cart.quantity -1} )
                    setDetail(productCopy)
                    updateProduct(productCopy)
                    updateStorage(productCopy)
                    // console.log(storeCart)
                }            
            
           
            // setDetail(productCopy)
            // updateProduct(productCopy)
        }
      
    }

    const updateStorage = (product: Products) => {
        let storage: Array<object> = []
        const products = localStorage.getItem('products')
        if (products !== null) {
            try {
                storage = JSON.parse(products)
                console.log(storage)
                localStorage.setItem('products', JSON.stringify(storage))
            } catch (e) { console.log('error') }
        }
        else{
            localStorage.setItem('products', JSON.stringify(product))
        }
    }
	

    const storeCart = (item: any) => {
        let cartProduct: Array<object> | null = []
        let storage = localStorage.getItem('cart-products')
        const isItemInCart = cart?.find((cart:any) => cart.id === detail.id ) 
        console.log(isItemInCart)

        if(storage && !isItemInCart){
            try {
                cartProduct = JSON.parse(storage)
                cartProduct?.push(item)
                localStorage.setItem('cart-products', JSON.stringify(cartProduct))
            } catch(e) {
                console.log('Failed to add item to cart')
            }
            console.log('..................', cartProduct)
        } 
        // else if(storage && isItemInCart){
        //     try{
        //         cartProduct = JSON.parse(storage)
        //         console.log('found match in storage', isItemInCart)
        //         const updateCartitem = cartProduct?.find((c) => c === detail ? item : cartProduct)
        //         // console.log(cartProduct?.find((c:any) => c.id === detail.id ? {...cart, cartQuantity: cart.cartQantity +1}: cartProduct))
        //         console.log(updateCartitem)
        //         // cart?.map((cart:any) => cart.id === detail.id ? {...cart, cartQuantity: cart.cartQuantity +1} : cart)
        //         localStorage.setItem('cart-products', JSON.stringify(cartProduct))
        //         console.log(storage)
        //     }catch(e){
        //         console.log('failed to update cartitem')
        //     }
        // }
        else {
            localStorage.setItem('cart-products', JSON.stringify(cart))
        }
    }
    

    
    // console.log(products[id])
    

    

    return(
        <div id="detailpage">
            
                <div data-testid="details" className="details">
                   
                   <img className="detailsIMG" src={detail.image} alt={detail.productName} height="190px"/>

                   <div className="mediaquery-layout">
                    <div className="layout">
                    <p className="name">{detail.productName} - {detail.description}</p>
                    {/* <p className="description">{detail.description}</p> */}
                    <p className="price">{detail.price} SEK</p>
                    
                    {detail.facts.map((fact: any) => ( 
                        <p className="fact" key={fact}>{fact}</p>
                    ))} 

                    <p className="fact">Amount in stock: {detail.quantity}</p>
                    </div>

                    <div className="add">
                        <button className="addbtn" key={detail.id} onClick={() => addToCart(item)}>Add to cart</button>
                    </div>
                   </div>
                    

                </div>
            
        </div>
    )
}

export default Details