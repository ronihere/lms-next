'use client'
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentPropsWithRef, useTransition } from "react";
import { Loader2Icon } from "lucide-react";

export default function ActionButton({ children, className, action, cb, ...props }: Omit<ComponentPropsWithRef<typeof Button>, "onClick"> & { children: React.ReactNode, className?: string, action: (...args: any[]) => Promise<{ error: boolean; message: string }>, cb?: (...args: any[]) => {} }) {
    const [isPending, startTransition] = useTransition()
    const handleClick = () => {
        startTransition(async () => {
            // Perform some action here
            const actionResponse = await action();
            if (cb) {
                cb(actionResponse);
            }
            console.log("Action performed!");
        });
    };
    return (
        <Button
            className={cn("", className)}
            onClick={handleClick}
            {...props}
        >
            <LoadingTextSwap isLoading={isPending} >
                {children}
            </LoadingTextSwap>
        </Button>
    )
}

function LoadingTextSwap({
    isLoading,
    children,
}: {
    isLoading: boolean
    children: React.ReactNode
}) {
    return (
        <div className="grid items-center justify-items-center">
            <div
                className={cn(
                    "col-start-1 col-end-2 row-start-1 row-end-2",
                    isLoading ? "invisible" : "visible"
                )}
            >
                {children}
            </div>
            <div
                className={cn(
                    "col-start-1 col-end-2 row-start-1 row-end-2 text-center",
                    isLoading ? "visible" : "invisible"
                )}
            >
                <Loader2Icon className="animate-spin" />
            </div>
        </div>
    )
}