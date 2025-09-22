import React from 'react';
import {resolveAppleWebApp} from "next/dist/lib/metadata/resolvers/resolve-basics";
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Box, Button, Card, Flex, Grid, Heading, Text} from "@radix-ui/themes";
import {IssueStatusBadge} from "@/app/components";
import ReactMarkdown from "react-markdown";
import delay from "delay";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons"
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";

interface Props {
    params: {id: string}
}
const IssueDetailPage = async ({params}: Props) => {

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })
    await delay(2000)

    // if(typeof params.id !== 'number')
    //     notFound();

    if(!issue)
        notFound();

    return (
        <Grid gap="5" columns={{initial:"1", md:"2"}}>
            <Box>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id} />
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;