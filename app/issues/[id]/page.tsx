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
import DeleteIssueButton from "@/app/issues/[id]/edit/DeleteIssueButton";
import {getServerSession} from "next-auth";
import authOption from "@/app/auth/authOptions";
import {NextResponse} from "next/server";

interface Props {
    params: {id: string}
}
const IssueDetailPage = async ({params}: Props) => {
    const session = await getServerSession(authOption);

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })
    await delay(2000)

    // if(typeof params.id !== 'number')
    //     notFound();

    if(!issue)
        notFound();

    return (
        <Grid gap="5" columns={{initial:"1", md:"5"}}>
            <Box className="md:col-span-4">
                <IssueDetails issue={issue} />
            </Box>
            { session &&
                <Box>
                    <Flex direction="column" gap="2">
                        <EditIssueButton issueId={issue.id}/>
                        <DeleteIssueButton issueId={issue.id}/>
                    </Flex>
                </Box>
            }
        </Grid>
    );
};

export default IssueDetailPage;