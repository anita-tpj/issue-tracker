import React from 'react';
import {Button} from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons"

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
    return (
        <Button color="red"><TrashIcon />Delete issue</Button>
    );
};

export default DeleteIssueButton;