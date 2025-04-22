'use client' // Error boundaries must be Client Components

/**
 *  // global-error must include html and body tags
 * @param param0 
 * @returns 
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (

        <html>
            <body>
                <h2>{error.message}</h2>
                <button onClick={() => reset()}>Try again</button>
            </body>
        </html>
    )
}

































