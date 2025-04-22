import GlobalError from "@/app/global-error"
import { render } from "@testing-library/react"
// Error is a class due to that its taking new Error
describe('Home component', () => {
    it('render the home component', () => {
        render(
            <GlobalError error={new Error("hi")} reset={() => { }} />
        )
    })
})