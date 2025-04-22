"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

/**checking the session on every route 
 * first session will come the page render
 * Global wrapper for Provider redux store
 * @param param0 
 * @returns 
 */

const GlobalWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {/* <Provider store={store}> */}
            <SessionProvider>
                {children}
            </SessionProvider>
            {/* </Provider> */}
        </div>
    )
}

export default GlobalWrapper