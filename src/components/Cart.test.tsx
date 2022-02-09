import { render, screen, within } from '@testing-library/react'
import Cart from "./Cart"
import ProductList from './products/ProductList'
import userEvent from "@testing-library/user-event"
import Card from "./card/Card"
import { Products } from '../models/Products'

describe('cart component', () => {

    // jest.spyOn(Object.getPrototypeOf(localStorage), 'getItem')
	// Object.setPrototypeOf(window.localStorage.getItem, jest.fn( () => [{
    //     id: 'idid1',
    //     image: '',
    //     productName: 'Icy Blue',
    //     description: 'Ski goggles with an icy blue color hue. Perfect for skiing in any weather and great for protecting your eyes from the snow. Ski fast and look amazing!',
    //     price: '299:-',
    //     facts: [
    //             'Color: Icy Blue',
    //             'Size: adjustable',
    //             'UV-protection: yes'
    //             ],
    //     quantity: 5
    // }] ))

    it('shows the initially empty cart after user clicks on the logo', () => {
        // localStorage.clear
        render(<Cart id={''} image={''} productName={''} description={''} facts={[]} price={''} quantity={0} />)
        const button = screen.getByRole('button', {name: 'CART'})
        userEvent.click(button)
        
        const cart = screen.getByText('Your cart')
        expect(cart).toBeInTheDocument()

        const products = screen.getByRole('listitem')
        const name = within(products).queryByText('Icy Blue') //fix so that card is not in document if cart is empty
        expect(name).not.toBeInTheDocument()
    })

    it('shows the added product in the cart ', () => {

        // const value = {
        //     id: 'idid1',
        //     image: '',
        //     productName: 'Icy Blue',
        //     description: 'Ski goggles with an icy blue color hue. Perfect for skiing in any weather and great for protecting your eyes from the snow. Ski fast and look amazing!',
        //     price: '299:-',
        //     facts: [
        //             'Color: Icy Blue',
        //             'Size: adjustable',
        //             'UV-protection: yes'
        //             ],
        //     quantity: 5
        // }
		// localStorage.setItem('card-products', JSON.stringify(value))

        render(<ProductList/>)
        render(<Cart id={'idid1'} image={""} productName={"Icy Blue"} description={""} facts={[]} price={""} quantity={0}/>)
        const items = screen.getAllByRole('listitem')
        userEvent.click(items[0])
        const button = screen.getByRole('button', {name: 'Add to cart'})
        userEvent.click(button)

        const cartButton = screen.getByRole('button', {name: 'CART'})
        userEvent.click(cartButton)
        const cart = screen.getByTestId('cart-list')
        const cartItems = within(cart).getByRole('listitem')
        const specs = within(cartItems).getByText('Icy Blue')
        expect(specs).toBeInTheDocument()
    })

    // it('shows the total price: 0kr if the cart is empty', () => {
    //     render(<Cart id={''} image={''} productName={''} description={''} facts={[]} price={''} quantity={0}/>)
    //     const cartButton = screen.getByRole('button', {name: 'CART'})
    //     userEvent.click(cartButton)

    //     // expect(window.localStorage.getItem).toHaveBeenCalledTimes(0);

    //     const items = screen.getByRole('listitem')
    //     expect(items).not.toBeInTheDocument()

    //     const total = screen.getByText('Total: 0 kr')
    //     expect(total).toBeInTheDocument()
    // })

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