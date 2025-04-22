import Loading from "@/app/loading"
import { render } from "@testing-library/react"

describe('Loading component', () => {
    it('render the loading component', () => {
        render(
            <Loading />
        )
    })
})