import React from 'react'

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-col w-full min-h-screen items-center justify-center mt-auto">
            {children}
        </div>
    )
}
