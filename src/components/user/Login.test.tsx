import { render, screen, within } from '@testing-library/react'
import Login from './Login'
import UserData from '../../models/UserData'
import { User } from '../../models/User'
import Header from '../../partials/Header'
import userEvent from '@testing-library/user-event'

describe('login component', () => { 

    it('renders without crashing', () => {
        render(<Login loggedin={false} setLoggedin={() => void ''} />)
    })

    it('gives inputfields classname invalid when filled in with incorrect credentials', () => {
        render(<Login loggedin={false} setLoggedin={(login: boolean) => login} />)

        const button = screen.getByAltText("Login icons created by Good Ware - Flaticon" )
        userEvent.click(button)

        const userinput = screen.getByPlaceholderText('username')
        userEvent.type(userinput as HTMLElement, 'kdoenig')

        const pwdinput = screen.getByPlaceholderText('password')
        userEvent.type(pwdinput as HTMLElement, 'kdoenig')
        
        const loginBtn = screen.getByRole('button', { name: 'login'})
        userEvent.click(loginBtn)

        expect(userinput).toHaveClass('invalid')
        expect(pwdinput).toHaveClass('invalid')
    })
})