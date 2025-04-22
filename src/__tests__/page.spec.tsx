import Home from "@/app/page"
import { render } from "@testing-library/react"

describe('Home component', () => {
    it('render the home component', () => {
        render(
            <Home />
        )
    })
})