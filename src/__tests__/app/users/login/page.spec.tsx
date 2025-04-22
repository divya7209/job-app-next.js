import LoginForm from "@/app/users/login/page"
import { render } from "@testing-library/react"

describe('Login Components', () => {
    it('render the login component', () => {
        render(
            <LoginForm />
        )
    })
})