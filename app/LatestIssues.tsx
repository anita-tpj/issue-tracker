import React from 'react';
import {Avatar, Card, Flex, Heading, Table} from "@radix-ui/themes";
import {Issue} from ".prisma/client";
import NextLink from "next/link";
import {IssueStatusBadge} from "@/app/components";
import prisma from "@/prisma/client";

const LatestIssues = async () => {
    const latestIssues = await prisma.issue.findMany({
        orderBy: {createdAt: "desc"},
        take: 5,
        include: {
            assignedToUser: true
        }

    })

    return (
        <Card>
            <Heading mb="5" size="4">Latest Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {latestIssues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                               <Flex justify="between">
                                   <Flex direction="column" gap="2" align="start">
                                       <NextLink href={`/issues/${issue.id}`}>{issue.title}</NextLink>
                                       <IssueStatusBadge status={issue.status}/>
                                   </Flex>
                                   {issue.assignedToUser &&
                                       <Avatar src={issue.assignedToUser.image!} fallback="?" radius="full" size="2" />}
                               </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>

    );
};

export default LatestIssues;