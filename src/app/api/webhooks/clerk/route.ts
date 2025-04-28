import { env } from '@/data/env/server'
import { deleteUserData, insertuserData, updateUserData } from '@/features/users/db/users'
import { syncClerkUserMetadata } from '@/services/clerk'
import { WebhookEvent } from '@clerk/nextjs/webhooks'
import { headers } from 'next/headers'
import { Webhook } from 'svix'

export async function POST(req: Request) {
    const headerPayload = await headers()
    const svixId = headerPayload.get("svix-id")
    const svixTimestamp = headerPayload.get("svix-timestamp")
    const svixSignature = headerPayload.get("svix-signature")

    if (!svixId || !svixTimestamp || !svixSignature) {
        return new Response("Error occurred -- no svix headers", {
            status: 400,
        })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(env.CLERK_WEBHOOK_SIGNING_SECRET)
    let event: WebhookEvent

    try {
        event = wh.verify(body, {
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp,
            "svix-signature": svixSignature,
        }) as WebhookEvent
    } catch (err) {
        console.error("Error verifying webhook:", err)
        return new Response("Error occurred", {
            status: 400,
        })
    }
    try {
        switch (event.type) {
            case 'user.created':
            case 'user.updated':
                const clerkUserId = event.data.id;
                const email = event.data.email_addresses.find(email => email.id === event.data.primary_email_address_id)?.email_address;
                const name = event.data.username
                const imageUrl = event.data.image_url
                const role = event.data.public_metadata.role
                if (!email) {
                    return new Response("Error occurred -- no email", {
                        status: 400,
                    })
                }
                if (!name) {
                    return new Response("Error occurred -- no name", { status: 400 })
                }
                if (event.type === 'user.created') {
                    const user = await insertuserData({
                        clerkUserId,
                        email,
                        name,
                        imageUrl,
                        role: 'user'
                    })
                    await syncClerkUserMetadata(user);
                } else {
                    await updateUserData(clerkUserId, {
                        email,
                        name,
                        imageUrl,
                        role: event.data?.public_metadata?.role
                    })
                }
                break;
            case 'user.deleted':
                if (event.data.id != null) {
                    await deleteUserData(event.data.id)
                }
                break;

        }
        return new Response("Success", {
            status: 200,
        })
    } catch (error) {
        console.error("Error processing webhook:", error)
        return new Response("Error occurred", {
            status: 500,
        })
    }


}