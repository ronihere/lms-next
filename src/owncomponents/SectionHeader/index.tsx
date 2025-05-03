import { Button } from "@/components/ui/button"
import ShowButtonInSectionHeader from "./ShowButtonInSectionHeader"

export default async function SectionHeader({ headerName, redirectTo, buttonTitle, children }: {
    headerName: string,
    redirectTo?: string
    buttonTitle?: string,
    children?: React.ReactNode
}) {
    return (
        <section className="w-full space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-3xl font-bold">{headerName}</h3>
                <ShowButtonInSectionHeader buttonTitle={buttonTitle} redirectTo={redirectTo} />
            </div>
            <div>
                {children}
            </div>
        </section>
    )
}