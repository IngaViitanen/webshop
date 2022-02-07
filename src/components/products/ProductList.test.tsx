import { render, screen, within } from '@testing-library/react'
import ProductList from './ProductList'
import userEvent from "@testing-library/user-event"

describe('product list komponent', () => {
    it('renders without crashing', () => {
        render(<ProductList/>)
    })

    it('renders 10 products initially', () => {
        render(<ProductList/>)
        const products = screen.getAllByRole('listitem')
        expect(products.length).toBeGreaterThanOrEqual(7)
    })
})

describe('searchbar', () => {
    it('is empty initially', () => {
        render(<ProductList/>)
        const input = screen.getByPlaceholderText('Search...')
        expect(input).toHaveValue('')
    })

    it('shows results matching to what the user searched for', () => {
        render(<ProductList/>)
        const input = screen.getByPlaceholderText('Search...')
        
        userEvent.type(input as HTMLElement, '')
        const items = screen.getAllByRole('listitem')

        items.forEach( items => 
			expect(items).toBeInTheDocument()
		)

        userEvent.type(input as HTMLElement, 'icy')
        expect(input).toHaveValue('icy')

        const matching = within(items[0]).getByText('Icy Blue')
        expect(matching).toBeInTheDocument()

        const notMatching = within(items[5]).queryByText('Sunnies')
        expect(notMatching).not.toBeInTheDocument()
    })
})
