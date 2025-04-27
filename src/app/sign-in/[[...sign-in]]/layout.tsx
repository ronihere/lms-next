import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="antialiased flex w-full h-full items-center justify-center mt-auto">
            {children}
        </div>
    )
}
