import { render, screen, within } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import { Products } from '../../models/Products'
import SearchBar from "../search/SearchBar"
import Card from "../card/Card"
import ProductList from "../products/ProductList"

describe('searchbar component', () => {

    const products: Products = {
        id: 'idid1',
        image: '',
        productName: 'Icy Blue',
        description: 'Ski goggles with an icy blue color hue. Perfect for skiing in any weather and great for protecting your eyes from the snow. Ski fast and look amazing!',
        price: '299:-',
        facts: [
                'Color: Icy Blue',
                'Size: adjustable',
                'UV-protection: yes'
                ],
        quantity: 5
    }

    it('is empty initially', () => {
        render(<SearchBar/>)
        const input = screen.getByPlaceholderText('Search...')
        expect(input).toHaveValue('')
    })
    it('shows results matching to what the user searched for', () => {
        render(<SearchBar/>)
        render(<ProductList/>)
        const input = screen.getByPlaceholderText('Search...')
        userEvent.type(input as HTMLElement, 'Icy Blue')
        expect(input).toHaveValue('Icy Blue')
        const items = screen.getAllByRole('listitem')
        console.log(items)
        const matching = within(items[0]).getByText('Icy Blue')
        expect(matching).toBeInTheDocument()
        const notMatching = within(items[5]).getByText('Sunnies')
        expect(notMatching).not.toBeInTheDocument()
    })
})