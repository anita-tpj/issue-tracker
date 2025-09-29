'use client'
import { Select } from "@radix-ui/themes";
import React from 'react';
import {Status} from "@prisma/client";
import {useRouter, useSearchParams} from "next/navigation";

const statuses: { label: string; value: Status }[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <Select.Root onValueChange={(status) => {
            const params = new URLSearchParams(searchParams.toString());
            if (status && status.trim()) {
                params.set('status', status as Status);
            } else {
                params.delete('status');
            }
            params.delete('page');

            const query = params.toString();
            router.push(`/issues${query ? `?${query}` : ''}`);
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