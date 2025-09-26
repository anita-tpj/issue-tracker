import React from 'react';
import {Avatar, Flex, Table} from "@radix-ui/themes";
import NextLink from "next/link";
import {ArrowDownIcon, ArrowUpIcon} from "@radix-ui/react-icons";
import {IssueStatusBadge, Link} from "@/app/components";
import {Issue, Status, User} from ".prisma/client";

export interface IssueQuery {
    status?: Status;
    orderBy?: keyof Issue;
    page?: string;
    pageSize?: string;
}

interface Props {
    searchParams : IssueQuery
    issues: (Issue & { assignedToUser: Pick<User, "image" | "name"> | null })[];
}

const IssueTable = ({searchParams, issues}: Props) => {
    const isActive = (col: keyof Issue) => searchParams.orderBy === col;
    const nextOrder = (col: keyof Issue) =>
        isActive(col) && searchParams.order === "asc" ? "desc" : "asc";

    return (
        <Table.Root variant="surface">
            <Table.Header>
                <Table.Row>
                    {columns.map((column) => {
                        const active = isActive(column.value);
                        const order = active ? searchParams.order : undefined;
                        return (
                            <Table.ColumnHeaderCell
                              key={column.value}
                              className={column.className}
                              aria-sort={active ? (order === "desc" ? "descending" : "ascending") : "none"}>
                                <NextLink
                                    href={{
                                        query: {
                                            ...searchParams,
                                            orderBy: column.value,
                                            order: nextOrder(column.value),
                                            page: "1", // optional: reset pagination when sorting
                                        },
                                    }}
                                >
                                    {column.label}
                                </NextLink>
                              {(column.value === searchParams.orderBy && searchParams.order === "asc") &&
                                  <ArrowUpIcon className="inline"/>}
                              {(column.value === searchParams.orderBy && searchParams.order === "desc") &&
                                  <ArrowDownIcon className="inline"/>}
                            </Table.ColumnHeaderCell>
                        )
                    })}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issues.map(issue => (
                    <Table.Row key={issue.id}>
                        <Table.Cell>
                            <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                            <div className="block md:hidden"><IssueStatusBadge status={issue.status} /></div>
                        </Table.Cell>
                        <Table.Cell className="hidden md:table-cell"><IssueStatusBadge status={issue.status} /></Table.Cell>
                        <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
                        <Table.Cell className="hidden md:table-cell">
                            {issue.assignedToUser &&
                                <Flex gap="2" align="center">
                                    <Avatar src={issue.assignedToUser.image!} fallback="?" radius="full" size="1" />
                                    {issue.assignedToUser.name}
                                </Flex>
                            }
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
};

const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
}[] = [
    {   label: "Issue",
        value: "title" },
    {
        label: "Status",
        value: "status",
        className: "hidden md:table-cell",
    },
    {
        label: "Created",
        value: "createdAt",
        className: "hidden md:table-cell",
    },
    {
        label: "Assign to",
        value: "assignedToUserId",
        className: "hidden md:table-cell",
    },
];

export const columnNames = columns.map(column => column.value)

export default IssueTable;