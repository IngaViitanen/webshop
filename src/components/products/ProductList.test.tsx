import { render, screen, within } from '@testing-library/react'
import ProductList from './ProductList'

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