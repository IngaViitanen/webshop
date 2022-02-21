import { render, screen, within } from '@testing-library/react'
import { MyGlobalContext, GlobalContext } from '../context/Context'
import React from 'react'
import Cart from "./Cart"
import userEvent from "@testing-library/user-event"
import { Products, CartItem } from '../models/Products'
import Details from './card/Details'
import ProductList from './products/ProductList'

describe('cart component', () => {

    const product: Products = {
        id: 'idid1',
        image: '',
        productName: 'Icy Blue',
        description: 'Ski goggles with an icy blue color hue. Perfect for skiing in any weather and great for protecting your eyes from the snow. Ski fast and look amazing!',
        price: 299,
        facts: [
                'Color: Icy Blue',
                'Size: adjustable',
                'UV-protection: yes'
                ],
        quantity: 5,
    }
    
    const cartitem: CartItem = {
        ogProduct: product,
        cartQuantity: 1
    }

    const products = [{
        id: 'idid1',
    image: '',
    productName: 'Icy Blue',
    description: 'Ski goggles with an icy blue color hue. Perfect for skiing in any weather and great for protecting your eyes from the snow. Ski fast and look amazing!',
    price: 299,
    facts: [
            'Color: Icy Blue',
            'Size: adjustable',
            'UV-protection: yes'
            ],
    quantity: 5,
    }]

    const cart = [{
        ogProduct: product,
        cartQuantity: 1
    }]
    
    const context: GlobalContext = {products: products , setProducts: (product) => product, cart: cart, setCart: (cart) => cart }

    // jest.spyOn(Object.getPrototypeOf(localStorage), 'getItem')
	// Object.setPrototypeOf(window.localStorage.getItem, jest.fn( () => { cartitem || []} ))

    

    it('shows the initially empty cart and a total of 0 when user clicks on the logo', () => {
        render(<Cart product={product} cartitem={cartitem} />)
        const button = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(button)
        
        const cart = screen.getByText('Your cart')
        expect(cart).toBeInTheDocument()

        const cartFloor = screen.getByTestId('cart')
        const list = within(cartFloor).queryByRole('listitem')
        expect(list).not.toBeInTheDocument()

        const total = screen.getByText('Total: kr')
        expect(total).toBeInTheDocument()
    })


    it('shows the added product and updates the price in the cart ', () => {
        render(
        <MyGlobalContext.Provider value={context}>
            <Details  details={product} id={product.id} updateProduct={(updated: Products) => updated} item={cartitem}/> 
            <Cart  product={product} cartitem={cartitem}/>
        </MyGlobalContext.Provider>
        )

        const addToCartBtn = screen.getByText('Add to cart')
        userEvent.click(addToCartBtn)

        const cartButton = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(cartButton)
    
        const cartelem = screen.getByText('Your cart')
        expect(cartelem).toBeInTheDocument()
        const cartItems = screen.getByTestId('cart')
        expect(cartItems).toBeInTheDocument()
    
        const listelem = within(cartItems).getByText('Icy Blue')
        expect(listelem).toBeInTheDocument()

        const total = screen.getByText('Total: 299 kr')
        expect(total).toBeInTheDocument()
    })


    it('reduces the quantity of a product after it has been added to cart', () => {
        render(
        <MyGlobalContext.Provider value={context}>
            <Details  details={product} id={product.id} updateProduct={(updated: Products) => updated} item={cartitem}/> 
            <Cart  product={product} cartitem={cartitem}/>
        </MyGlobalContext.Provider>
        )

        const button = screen.getByRole('button', {name: 'Add to cart'})
        userEvent.click(button)

        const quantity = screen.getByText('Amount in stock: 4')
        expect(quantity).toBeInTheDocument()
    })

    // + and - buttons



    // stylea varukorg
    // lägg till 'please login to make a purchase' när man trycker på purchase
    // när man är inloggad 'thank you for your purchase' 'DISCLAIMER: this is not a real purchase'
    // ladda upp till heroku

})