'use client'

import {Button, Callout, Text, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {issueSchema} from "@/app/validationSchemas";
import {z} from "zod"

type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({resolver: zodResolver(issueSchema)})
    const router = useRouter();
    const [error, setError] = useState('');
    return (
        <div className="max-w-xl">
            {error &&
                <Callout.Root color ="red" className="mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            }
            <form className="space-y-3" onSubmit={handleSubmit(async (data)=> {
                try {
                    await axios.post('/api/issues', data);
                    router.push('/issues')
                } catch (error) {
                    setError("An unexpected error occurred.")
                }

            })}>
                <TextField.Root placeholder="Title" {...register('title')} />
                {errors.title && <Text as="p" color="red">{errors.title.message}</Text>}
                <Controller render={({field})=><SimpleMDE placeholder="Description" {...field} />} name="description" control={control}/>
                {errors.description && <Text as="p" color="red">{errors.description.message}</Text>}
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;