import { render, screen, within } from '@testing-library/react'
import React from 'react'
import Cart from "./Cart"
import ProductList from './products/ProductList'
import userEvent from "@testing-library/user-event"
import Card from "./card/Card"
import { Products } from '../models/Products'
// import { useState as setStateMock } from 'react'

describe('cart component', () => {

    const value = {
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
        quantity: 5
    }

    jest.spyOn(Object.getPrototypeOf(localStorage), 'getItem')
	Object.setPrototypeOf(window.localStorage.getItem, jest.fn( () => [{ value }] ))

    

    it('shows the initially empty cart after user clicks on the logo', () => {
        // localStorage.clear
        render(<Cart id={''} image={''} productName={''} description={''} facts={[]} price={0} quantity={0} />)
        const button = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(button)
        
        const cart = screen.getByText('Your cart')
        expect(cart).toBeInTheDocument()

        const products = screen.getByRole('listitem')
        const empty = within(products).queryByText('Icy Blue')
        expect(empty).not.toBeInTheDocument()
    })



    it('shows the added product in the cart ', async () => {
        
		localStorage.setItem('cart-products', JSON.stringify(value))

        render(<ProductList/>)
        render(<Cart id={value.id} image={value.image} productName={value.productName} description={value.description} facts={value.facts} price={value.price} quantity={value.quantity}/>)
        const items = screen.getAllByRole('listitem')
        userEvent.click(items[0])
        const button = screen.getByRole('button', {name: 'Add to cart'})
        userEvent.click(button)

        const cartButton = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(cartButton)
    
        const cart = screen.getByTestId('cart-list')
        expect(cart).toBeInTheDocument()
        const cartItems = within(cart).getByTestId('cart')
        expect(cartItems).toBeInTheDocument()
    })



    it('shows the total price: 0kr if the cart is empty', () => {
        render(<Cart id={''} image={''} productName={''} description={''} facts={[]} price={0} quantity={0}/>)
        const cartButton = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(cartButton)

        const items = screen.getByRole('listitem')
        const empty = within(items).queryByText('Icy Blue')
        expect(empty).not.toBeInTheDocument()

        const total = screen.getByText('Total: 0 kr')
        expect(total).toBeInTheDocument()
    })

    it('shows the total price of products in the cart', () => {
        render(<ProductList/>)
        render(<Cart id={value.id} image={value.image} productName={value.productName} description={value.description} facts={value.facts} price={value.price} quantity={value.quantity}/>)
        
        const items = screen.getAllByRole('listitem')
        userEvent.click(items[0])
        const button = screen.getByRole('button', {name: 'Add to cart'})
        userEvent.click(button)

        const cartButton = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(cartButton)

        const cart = screen.getByTestId('cart-list')
        const cartItems = within(cart).getByRole('listitem')
        const specs = within(cartItems).getByText('Icy Blue')
        expect(specs).toBeInTheDocument()

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