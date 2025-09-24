import {NextRequest, NextResponse} from "next/server";
import {patchIssueSchema} from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import delay from "delay";
import {getServerSession} from "next-auth";
import authOption from "@/app/auth/authOptions";


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }){
    const session = await getServerSession(authOption);

    if(!session) return NextResponse.json({}, {status: 401});

    const body = await request.json();

    const validation = patchIssueSchema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const {assignedToUserId, title, description } = body;

    if(assignedToUserId) {
        const userId = await prisma.user.findUnique({
            where: {id: body.assignedToUserId}
        })

        if(!userId) return NextResponse.json({error: 'Invalid user'}, {status: 400})
    }

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!issue)
        return NextResponse.json({error: 'This is not a valid issue'}, {status:404})

    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data: {
            title,
            description,
            assignedToUserId
        }
    })

    return NextResponse.json(updatedIssue, {status: 201})
}

export async function DELETE(request=NextRequest, {params}: {params:{id: string}}) {
    const session = await getServerSession(authOption);

    if(!session) return NextResponse.json({}, {status: 401});

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!issue)
        return NextResponse.json({error: 'Invalid'}, {status:404})

    await prisma.issue.delete({
        where: {id: issue.id}
    })

    return NextResponse.json({})
}