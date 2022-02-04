import { render, screen, within } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import { Products } from '../models/Products'
import Card from './Card'

describe('card component', () => {

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

    it('does not show details initially', () => {
        render(<Card product={products}/>)
        const item = screen.getAllByRole('listitem')
        expect(item[0]).toBeInTheDocument()
        const details = screen.queryByTestId('details')
        expect(details).not.toBeInTheDocument()
    }) 

    it('show details after clicking an item', () => {
        render(<Card product={products}/>)
        const item = screen.getAllByRole('listitem')
        userEvent.click(item[0])
        const details = screen.queryByTestId('details')
        expect(details).toBeInTheDocument()
    }) 
})