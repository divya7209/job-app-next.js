import Jobs from "@/app/users/jobs/page"
import { render } from "@testing-library/react"

describe('Jobform Components', () => {
    it('render the Jobform component', () => {
        render(
            <Jobs />
        )
    })
})