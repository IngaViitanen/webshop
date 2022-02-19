import { render, screen, within } from '@testing-library/react'
import { MyGlobalContext } from '../context/Context'
import React from 'react'
import Cart from "./Cart"
import userEvent from "@testing-library/user-event"
import { Products, CartItem } from '../models/Products'
import Details from './card/Details'

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
    }
    const cartitem: CartItem = {
        ogProduct: products,
        cartQuantity: 1
    }

    jest.spyOn(Object.getPrototypeOf(localStorage), 'getItem')
	Object.setPrototypeOf(window.localStorage.getItem, jest.fn( () => [{ products }] ))

    

    it('shows the initially empty cart after user clicks on the logo', () => {
        render(<Cart product={[products]} cartitem={cartitem} />)
        const button = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(button)
        
        const cart = screen.getByText('Your cart')
        expect(cart).toBeInTheDocument()

        const cartFloor = screen.getByTestId('cart')
        const list = within(cartFloor).queryByRole('listitem')
        expect(list).not.toBeInTheDocument()
    })



    it('shows the added product in the cart ', () => {
        
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
                
        render(<Details  details={products} id={products.id} updateProduct={(updated: Products) => updated} item={cartitem}/>)
        render(<Cart product={[products]} cartitem={cartitem}/>)
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
        render(<Cart product={[products]} cartitem={cartitem}/>)
        const cartButton = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(cartButton)

        const list = screen.getByTestId('cart-list')
        const items = within(list).queryByText('Icy Blue')
        expect(items).not.toBeInTheDocument()

        const total = screen.getByText('Total: 0 kr')
        expect(total).toBeInTheDocument()
    })

    it('shows the total price of products in the cart', () => {
        // localStorage.setItem('cart-products', JSON.stringify(products))
        // console.log('STORAGE:::::::', localStorage.setItem('cart-products', JSON.stringify(products)))
        // render(<ProductList/>)
        render(<Details  details={products} id={products.id} updateProduct={(updated: Products) => updated} item={cartitem}/>)
        render(<Cart product={[products]} cartitem={cartitem}/>)
        
        // const items = screen.getAllByRole('listitem')
        // userEvent.click(items[0])
        const button = screen.getByRole('button', {name: 'Add to cart'})
        userEvent.click(button)

        const cartButton = screen.getByAltText('Shopping bag icons created by CreativeCons - Flaticon')
        userEvent.click(cartButton)

        const cart = screen.getByTestId('cart-list')
    //     // expect(cart).toBeInTheDocument()
        const cartItems = within(cart).getByTestId('cart')
        expect(cartItems).toBeInTheDocument()


        const [listelem] = screen.getAllByText('Icy Blue')
        expect(listelem).toBeInTheDocument()
        const price = screen.getByTestId('total')
        expect(price).toBeDefined()
    })

    it('reduces the quantity of a product after it has been added to cart', () => {
        render(<Details details={products} id={products.id} updateProduct={(updated: Products) => updated} item={cartitem}/>)
        // render(<ProductList/>)
        // render(<Cart id={""} image={""} productName={""} description={""} facts={[]} price={""} quantity={0}/>)
        // const items = screen.getAllByRole('listitem')
        // userEvent.click(items[0])
        const item = screen.getByTestId('details')
        const button = within(item).getByRole('button', {name: 'Add to cart'})
        expect(button).toBeInTheDocument()
        userEvent.click(button)

        const quantity = screen.getByText('Items left: 4')
        expect(quantity).toBeInTheDocument()
    })

    //increase cart quantity
    //decrease cart quantity
    //deletes an item
})