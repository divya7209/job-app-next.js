import AppliedJobs from "@/app/users/applied/page"
import { render } from "@testing-library/react"

describe('Jobform Components', () => {
    it('render the Jobform component', () => {
        render(
            <AppliedJobs />
        )
    })
})