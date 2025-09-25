import React from 'react';
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import {Status} from ".prisma/client";
import NextLink from "next/link";


interface Props {
    open: number,
    inProgress: number,
    closed: number
}
const IssuesSummary = ({open, inProgress, closed}: Props) => {

    const containers: {label: string, value: number, status: Status}[] = [
        {label: "Open Issues", value: open, status: "OPEN"  },
        {label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS"},
        {label: "Closed Issues", value: closed, status: "CLOSED"}
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