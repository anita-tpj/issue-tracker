import React from 'react';
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import {Status} from ".prisma/client";
import prisma from "@/prisma/client";
import NextLink from "next/link";

const IssuesSummary = async () => {
    const openIssues = await prisma.issue.count({
        where: {status:"OPEN"}
    })

    const inProgressIssues = await prisma.issue.count({
        where: {status:"IN_PROGRESS"}
    })

    const closedIssues = await prisma.issue.count({
        where: {status:"CLOSED"}
    })
    const containers: {label: string, value: number, status: Status}[] = [
        {label: "Open Issues", value: openIssues, status: "OPEN"  },
        {label: "In Progress Issues", value: inProgressIssues, status: "IN_PROGRESS"},
        {label: "Closed Issues", value: closedIssues, status: "CLOSED"}
    ]
    return (
        <Card>
            <Heading mb="5" size="4">Issues Summary</Heading>
            <Flex gap="3">
            {containers.map(container => (
                <Card key={container.label}>
                    <Flex direction="column" gap="1">
                        <NextLink href={`/issues?status=${container.status}`} className="text-sm font-medium">{container.label}</NextLink>
                        <Text size="5" className='font-bold'>{container.value}</Text>
                    </Flex>
                </Card>
            ))}
            </Flex>
        </Card>
    );
};

export default IssuesSummary;