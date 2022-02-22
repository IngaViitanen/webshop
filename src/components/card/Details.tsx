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
    const [soldOutMessage, setSoldOutMessage] = useState('')


    const addToCart = (cartitem: CartItem) => {    
        if(cart !== undefined){
            const productCopy = {...details, quantity: details.quantity -1}
            const test = {...details, quantity: -1}
            const storeCartItem = {...detail,  quantity: detail.quantity -1, cartQuantity: +1}
            const newCartArr = [...cart,  storeCartItem]
            const isItemInCart = cart.find((cart) => cart.id === detail.id ) 
            console.log(isItemInCart)

                if(!isItemInCart){
                    setCart(newCartArr)
                    storeCart(storeCartItem)
                    setDetail(productCopy)
                    updateProduct(productCopy)
                    console.log('new item in cart')
                }
                else if(isItemInCart){
                    console.log('found matching item')
                    if(detail.quantity > 0){
                        setCart(
                            cart.map((cart) => cart.id === detail.id ? {...cart, cartQuantity: cart.cartQuantity +1, quantity: detail.quantity -1} : cart) 
                        )
                        
                        storeCart(cart.map((cart) => cart.id === detail.id ? {...cart, cartQuantity: cart.cartQuantity +1, quantity: detail.quantity -1} : cart) )
                        setDetail(productCopy)
                        updateProduct(productCopy)
                    }else{
                        setSoldOutMessage("Oh no! We don't have this item in stock anymore 😢")
                    }
                }
            }  
        }    
	

    const storeCart = (item: any) => {
        let cartProduct: Array<object> | null = []
        let storage = localStorage.getItem('cart-products')
        const isItemInCart = cart.find((cart) => cart.id === detail.id ) 
        console.log(isItemInCart)

        if(storage && !isItemInCart){
            try {
                cartProduct = JSON.parse(storage)
                cartProduct?.push(item)
                localStorage.setItem('cart-products', JSON.stringify(cartProduct))
            } catch(e) {
                console.log('Failed to add item to cart')
            }
        } 
        else {
            localStorage.setItem('cart-products', JSON.stringify(cart))
        }
    }
    


    return(
        <div id="detailpage">
            
                <div data-testid="details" className="details">
                   
                   <p>{soldOutMessage}</p>
                   <img className="detailsIMG" src={detail.image} alt={detail.productName} height="190px"/>

                   <div className="mediaquery-layout">
                    <div className="layout">
                    <p className="name">{detail.productName} - {detail.description}</p>
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