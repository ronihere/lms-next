'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export default function ShowButtonInSectionHeader({ redirectTo, buttonTitle }: { buttonTitle?: string, redirectTo?: string }) {
    const router = useRouter()
    if (buttonTitle) {
        return (
            <Button variant='default' onClick={() => router.push(redirectTo || '')}>
                {buttonTitle}
            </Button>
        )
    } return null;
}
