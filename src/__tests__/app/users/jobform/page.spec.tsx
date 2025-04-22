import JobForm from "@/app/users/jobform/page"
import { render } from "@testing-library/react"

describe('Jobform Components', () => {
    it('render the Jobform component', () => {
        render(
            <JobForm />
        )
    })
})