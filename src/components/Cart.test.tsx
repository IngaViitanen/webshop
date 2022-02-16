import { render, screen, within } from '@testing-library/react'
import { MyGlobalContext } from '../context/Context'
import React from 'react'
import Cart from "./Cart"
import ProductList from './products/ProductList'
import userEvent from "@testing-library/user-event"
import Card from "./card/Card"
import { Products } from '../models/Products'
// import { useState as setStateMock } from 'react'

describe('cart component', () => {

    const products: Products = {
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
        cartQuantity: 0
    }

    jest.spyOn(Object.getPrototypeOf(localStorage), 'getItem')
	Object.setPrototypeOf(window.localStorage.getItem, jest.fn( () => [{ products }] ))

    

    it('shows the initially empty cart after user clicks on the logo', () => {
        
        // localStorage.clear
        render(<Cart product={[products]} />)
        const button = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(button)
        
        const cart = screen.getByText('Your cart')
        expect(cart).toBeInTheDocument()

        const cartFloor = screen.getByTestId('cart')
        const list = within(cartFloor).queryByRole('listitem')
        expect(list).not.toBeInTheDocument()
    })



    it('shows the added product in the cart ', () => {

        localStorage.setItem('cart-products', JSON.stringify(products))
        
		//  const context: Products = {
        //     id: 'idid1',
        //     image: '',
        //     productName: 'Icy Blue',
        //     description: 'Ski goggles with an icy blue color hue. Perfect for skiing in any weather and great for protecting your eyes from the snow. Ski fast and look amazing!',
        //     price: 299,
        //     facts: [
        //             'Color: Icy Blue',
        //             'Size: adjustable',
        //             'UV-protection: yes'
        //             ],
        //     quantity: 5
        // }

        //     render(
        //     <MyGlobalContext.Provider value={context}>
        //         <ProductList/> 
        //         <Cart  product={[products]}/>
        //     </MyGlobalContext.Provider>
        //         )
                
        render(<ProductList/>)
        render(<Cart product={[products]}/>)
        const items = screen.getAllByRole('listitem')
        userEvent.click(items[0])
        const button = screen.getByRole('button', {name: 'Add to cart'})
        userEvent.click(button)

        const cartButton = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(cartButton)
    
        const cart = screen.queryByTestId('cart-list')
        const cartItems = within(cart!).queryByTestId('cart')
        expect(cartItems).toBeInTheDocument()
    
        const [listelem] = screen.getAllByText('Icy Blue')
        expect(listelem).toBeInTheDocument()
    })



    it('shows the total price: 0kr if the cart is empty', () => {
        render(<Cart product={[products]}/>)
        const cartButton = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(cartButton)

        const list = screen.getByTestId('cart-list')
        const items = within(list).queryByText('Icy Blue')
        expect(items).not.toBeInTheDocument()

        const total = screen.getByText('Total: 0 kr')
        expect(total).toBeInTheDocument()
    })

    it('shows the total price of products in the cart', () => {
        localStorage.setItem('cart-products', JSON.stringify(products))
        render(<ProductList/>)
        render(<Cart product={[products]}/>)
        
        const items = screen.getAllByRole('listitem')
        userEvent.click(items[0])
        const button = screen.getByRole('button', {name: 'Add to cart'})
        userEvent.click(button)

        const cartButton = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(cartButton)

        const cart = screen.queryByTestId('cart-list')
    //     // expect(cart).toBeInTheDocument()
        const cartItems = within(cart!).queryByTestId('cart')
        expect(cartItems).toBeInTheDocument()

        const [listelem] = screen.getAllByText('Icy Blue')
        expect(listelem).toBeInTheDocument()
        const price = screen.queryAllByText('299:-')
        expect(price[0]).toBeInTheDocument()

    // //     const cart = screen.getByTestId('cart-list')
    // //     const cartItems = within(cart).getByRole('listitem')
    //     const specs = within(cartItems!).queryByRole('listitem')
    //     expect(specs).toBeInTheDocument()

        const total = screen.getByText('Total: 299 kr')
        expect(total).toBeInTheDocument()
    })

    // it('reduces the quantity of a product after it has been added to cart', () => {
    //     render(<ProductList/>)
    //     render(<Cart id={""} image={""} productName={""} description={""} facts={[]} price={""} quantity={0}/>)
    //     render(<Card product={[]}/>)
    //     const items = screen.getAllByRole('listitem')
    //     userEvent.click(items[0])
    //     const button = screen.getByRole('button', {name: 'Add to cart'})
    //     userEvent.click(button)

    //     userEvent.click(items[0])
    //     const item = screen.getByTestId('details')
    //     const quantity = within(item).getByText('Items left: 4')
    //     expect(quantity).toBeInTheDocument()
    // })
})