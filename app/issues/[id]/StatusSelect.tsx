'use client'
import { Select } from "@radix-ui/themes";
import {Issue, Status} from ".prisma/client";
import axios from "axios";
import toast from "react-hot-toast";

const StatusSelect = ({issue}: {issue: Issue}) => {
    const statuses: {label: string, value: Status}[] = [
        {label: "Open", value: "OPEN"},
        {label: "In Progress", value: "IN_PROGRESS"},
        {label: "Closed", value: "CLOSED"},
    ]

    const issueStatus = (status: string) => {
        axios
            .patch("/api/issues/" + issue.id, {
                status
            })
            .catch(() => {
                toast.error("Changes could not be saved.");
            });
    };

    return (
        <Select.Root defaultValue={issue.status} onValueChange={issueStatus}>
            <Select.Trigger placeholder="Issue Status..." />
            <Select.Content>
                <Select.Group>
                    {statuses.map(status =>
                        <Select.Item key={status.value} value={status.value}>{status.label}</Select.Item>
                    )}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};


export default StatusSelect;