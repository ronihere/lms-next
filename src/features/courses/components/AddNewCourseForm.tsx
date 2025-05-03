'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addNewCourseSchema } from '../schema/addCourse.schema'
import { z } from 'zod'
import ActionButton from '@/owncomponents/ActionButton'
import { addNewCourseAction } from '../actions/Courses'
import { useRouter } from 'next/navigation'

export default function AddNewCourseForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof addNewCourseSchema>>({
        resolver: zodResolver(addNewCourseSchema),
        defaultValues: {
            name: '',
            description: ''
        }
    })
    const handleSubmit = async (data: z.infer<typeof addNewCourseSchema>) => {
        const actionResponse = await addNewCourseAction(data)
        if (actionResponse.error) {
            console.log(actionResponse.message)
            return;
        }

        console.log(actionResponse.message)
        router.push('/admin/courses')
    }
    return (
        <div className='flex flex-col w-full md:justify-center md:items-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}
                    className='md:w-1/2 space-y-4'
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                {fieldState.error ? <FormMessage /> : <FormDescription>This is public display name of the Course.</FormDescription>}
                            </FormItem>
                        )
                        }
                    />
                    < FormField
                        control={form.control}
                        name="description"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Description" {...field} />
                                </FormControl>
                                {fieldState.error ? <FormMessage /> : <FormDescription>This is public description of the Course.</FormDescription>}
                            </FormItem>
                        )
                        }
                    />
                    <ActionButton action={addNewCourseAction} type='submit' >
                        Save
                    </ActionButton>
                </form>

            </Form>

        </div >
    )
}
