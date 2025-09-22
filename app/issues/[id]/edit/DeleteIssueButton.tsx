'use client'

import React, {useState} from 'react';
import {AlertDialog, Button, Flex} from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons"
import axios from "axios";
import {useRouter} from "next/navigation";
import {Spinner} from "@/app/components";

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false)

    const deleteIssue = async ()=> {
        try {
            // throw new Error();
            setDeleting(true)
            await axios.delete('/api/issues/' + issueId)
            router.push('/issues')
            router.refresh()
        } catch (error) {
            setError(true)
            setDeleting(false)
        }
    }

    return (
        <>
            <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button disabled={isDeleting} color="red"><TrashIcon/>Delete issue {isDeleting && <Spinner />}</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to delete this issue? This action cannot be
                    undone.
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={deleteIssue}>
                            Delete
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>

        <AlertDialog.Root open={error}>
            <AlertDialog.Content>
                <AlertDialog.Title>Error</AlertDialog.Title>
                <AlertDialog.Description>This issue can not be deleted.</AlertDialog.Description>
                <Button  color="gray"
                         variant="soft"
                         mt="2"
                         onClick={()=> setError(false)}>OK
                </Button>
            </AlertDialog.Content>
        </AlertDialog.Root>
        </>

    );
};

export default DeleteIssueButton;