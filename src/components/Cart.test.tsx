import { render, screen, within } from '@testing-library/react'
import { MyGlobalContext, GlobalContext } from '../context/Context'
import React from 'react'
import Cart from "./Cart"
import userEvent from "@testing-library/user-event"
import { Products, CartItem } from '../models/Products'
import Details from './card/Details'
import ProductList from './products/ProductList'

describe('cart component', () => {

    const deleteItemMock = jest.fn()

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
        quantity: 4,
        cartQuantity: 2
    }

    const productsArr = [{
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

    const cartArr = [{
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
        quantity: 4,
        cartQuantity: 2
    }]
    
    const context: GlobalContext = {products: productsArr , setProducts: (product) => product, cart: cartArr, setCart: (cart) => cart }

    

    it('shows the initially empty cart and a total of 0 when user clicks on the logo', () => {
        render(<Cart product={product} cartitem={cartitem} deleteItem={deleteItemMock}/>)
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


    it('shows the added products and updates the price in the cart ', () => {
        render(
        <MyGlobalContext.Provider value={context}>
            <Details  details={product} id={product.id} updateProduct={(updated: Products) => updated} item={cartitem}/> 
            <Cart  product={product} cartitem={cartitem} deleteItem={deleteItemMock}/>
        </MyGlobalContext.Provider>
        )

        const addToCartBtn = screen.getByText('Add to cart')
        userEvent.click(addToCartBtn)

        const cartButton = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(cartButton)
    
        const listelem = screen.getByText('Icy Blue')
        expect(listelem).toBeInTheDocument()

        const total = screen.getByText('Total: 598 kr')
        expect(total).toBeInTheDocument()
    })


    it('reduces the quantity of a product after it has been added to cart', () => {
        render(
        <MyGlobalContext.Provider value={context}>
            <Details  details={product} id={product.id} updateProduct={(updated: Products) => updated} item={cartitem}/> 
            <Cart  product={product} cartitem={cartitem} deleteItem={deleteItemMock}/>
        </MyGlobalContext.Provider>
        )

        const button = screen.getByRole('button', {name: 'Add to cart'})
        userEvent.click(button)

        const quantity = screen.getByText('Amount in stock: 4')
        expect(quantity).toBeInTheDocument()
    })

    it('removes an item when user clicks on the delete button', () => {
        render(
        <MyGlobalContext.Provider value={context}> 
            <Cart  product={product} cartitem={cartitem} deleteItem={deleteItemMock}/>
        </MyGlobalContext.Provider>
        )

        const cartButton = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(cartButton)
        
        const delBtn = screen.getByAltText('Trash icons created by Freepik - Flaticon')
        userEvent.click(delBtn)
        
        expect(deleteItemMock).toHaveBeenCalled()
    })

    it('increases cartQuantity when user clicks the + button', () => {
        render(
            <MyGlobalContext.Provider value={context}> 
                <Cart  product={product} cartitem={cartitem} deleteItem={deleteItemMock}/>
            </MyGlobalContext.Provider>
        )

        const cartButton = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(cartButton)

        const increase = screen.getByText('+')
        userEvent.click(increase)

        const quantity = screen.getByText('2')
        expect(quantity).toBeInTheDocument()
    })

    it('decreases cartQuantity when user clicks - button', () => {
        render(
            <MyGlobalContext.Provider value={context}> 
                <Cart  product={product} cartitem={cartitem} deleteItem={deleteItemMock}/>
            </MyGlobalContext.Provider>
        )

        const cartButton = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(cartButton)

        const increase = screen.getByText('-')
        userEvent.click(increase)

        const quantity = screen.getByText('2')
        expect(quantity).toBeInTheDocument()
    })

    // delete test


    // stylea purchase knappen
    // ladda upp till heroku

})