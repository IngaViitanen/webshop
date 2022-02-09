import { render, screen, within } from '@testing-library/react'
import Cart from "./Cart"
import ProductList from './products/ProductList'
import userEvent from "@testing-library/user-event"

describe('cart component', () => {
    it('shows the cart after user clicks on the logo', () => {
        render(<Cart id={""} image={""} productName={""} description={""} facts={[]} price={""} quantity={0}/>)
        const button = screen.getByRole('button', {name: 'CART'})
        userEvent.click(button)
        
        const cart = screen.getByText('Your cart')
        expect(cart).toBeInTheDocument()
    })

    it('shows the added product in the cart ', () => {
        render(<ProductList/>)
        render(<Cart id={""} image={""} productName={""} description={""} facts={[]} price={""} quantity={0}/>)
        const items = screen.getAllByRole('listitem')
        userEvent.click(items[0])
        const button = screen.getByRole('button', {name: 'Add to cart'})
        userEvent.click(button)

        const cartButton = screen.getByRole('button', {name: 'CART'})
        userEvent.click(cartButton)
        const cart = screen.getByTestId('cart-list')
        const cartItems = within(cart).queryByText('Icy Blue')
        expect(cartItems).toBeInTheDocument()
    })
})