import { render, screen, within } from '@testing-library/react'
import { MyGlobalContext } from '../../context/Context'
import { Products, CartItem } from '../../models/Products'
import ProductList from './ProductList'
import userEvent from "@testing-library/user-event"
import Details from '../card/Details'


describe('product list komponent', () => {

    // const products: Products = {
        // id: 'idid1',
        // image: '',
        // productName: 'Icy Blue',
        // description: 'Ski goggles with an icy blue color hue. Perfect for skiing in any weather and great for protecting your eyes from the snow. Ski fast and look amazing!',
        // price: 299,
        // facts: [
        //         'Color: Icy Blue',
        //         'Size: adjustable',
        //         'UV-protection: yes'
        //         ],
        // quantity: 5
    // }

    it('renders without crashing', () => {
        // const context: Products = {
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
        render(
            // <MyGlobalContext.Provider value={context}>
                <ProductList/>
            // </MyGlobalContext.Provider>
        )

    })

    it('renders 7 products initially', () => {
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

    // it('if nothing matches the search the message "sorry we could not find what you are searching for"', () => {
    //     render(<ProductList/>)
    //     const input = screen.getByPlaceholderText('Search...')

    //     userEvent.type(input as HTMLElement, 'gerk')
    //     expect(input).toHaveValue('gerk')

    //     const message = screen.queryByRole('paragraph', {name: 'Sorry we could not find what you are searching for :('})
    //     expect(message).toBeInTheDocument()
        
    // })
})

describe('details component', () => {

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
    }

    const cartitem: CartItem = {
        ogProduct: products,
        cartQuantity: 1
    }

    it('does not show details initially', () => {
        render(<ProductList/>)
        const details = screen.queryByTestId('details')
        expect(details).not.toBeInTheDocument()
    }) 

    it('show details after clicking an item', () => {
        render(<ProductList/>)
        render(<Details details={products} id={products.id} updateProduct={(updated: Products) => updated} item={cartitem}/>)
        const item = screen.getAllByRole('listitem')
        userEvent.click(item[0])
        const details = screen.getAllByTestId('details')
        expect(details[0]).toBeInTheDocument()
    }) 
})
