'use client'
import { Select } from "@radix-ui/themes";
import React from 'react';
import {Status} from "@prisma/client";
import {useRouter} from "next/navigation";

const statuses: { label: string; value: Status }[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {

    const route = useRouter();
    return (
        <Select.Root onValueChange={(status) => {
            const query = (status && status !== ' ') ? `?status=${status}` : ''
            route.push('/issues' + query)
        }}>
            <Select.Trigger placeholder="Filter by status..."/>
            <Select.Content>
                <Select.Item value=' '>All</Select.Item>
                {statuses.map(status =>
                    <Select.Item key={status.value} value={status.value}>{status.label}</Select.Item>
                )}
            </Select.Content>
        </Select.Root>
    );
};

export default IssueStatusFilter;