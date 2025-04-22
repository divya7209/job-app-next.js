import RegisterForm from "@/app/users/register/page"
import { render } from "@testing-library/react"

describe('Register Components', () => {
    it('render the register component', () => {
        render(
            <RegisterForm />
        )
    })
})