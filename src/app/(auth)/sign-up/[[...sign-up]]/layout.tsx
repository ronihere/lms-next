import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full min-h-screem flex-col items-center justify-center mt-auto">
            {children}
        </div>
    )
}
