import React from 'react';
import {resolveAppleWebApp} from "next/dist/lib/metadata/resolvers/resolve-basics";
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {number} from "zod";

interface Props {
    params: {id: string}
}
const IssueDetailPage = async ({params}: Props) => {

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    // if(typeof params.id !== 'number')
    //     notFound();

    if(!issue)
        notFound();

    return (
        <div>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </div>
    );
};

export default IssueDetailPage;