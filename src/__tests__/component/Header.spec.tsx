import Header from "@/components/Header"
import { render } from "@testing-library/react"
// Mock the next/router useRouter function
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));
describe('Header component', () => {
    it('render the Header component', () => {
        render(
            <Header />
        )
    })
})