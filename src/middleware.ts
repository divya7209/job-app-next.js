import { withAuth } from "next-auth/middleware";
// protected route for frontend
export default withAuth({
    pages: {
        signIn: "/users/login",
    },
});
// add all paths from where you want to logout
// if session is not there then reflect to login page
// from this pages route to above login page route
export const config = {
    matcher: ["/users/jobs", "/users/applied", "/users/jobform"],
};