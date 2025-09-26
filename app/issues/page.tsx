import {Flex} from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueActions from "@/app/issues/IssueActions";
import {Status} from ".prisma/client";
import Pagination from "@/app/components/Pagination";
import PageSizeSelect from "@/app/components/PageSizeSelect";
import IssueTable, {columnNames, IssueQuery} from "@/app/issues/IssueTable";
import delay from "delay";
import {Metadata} from "next";

interface Props {
    searchParams: Promise<IssueQuery>
}

const IssuesPage = async ({searchParams} : Props) => {
    const resolvedSearchParams = await searchParams;

    const statuses = Object.values(Status);
    const status = resolvedSearchParams.status && statuses.includes(resolvedSearchParams.status)
        ? resolvedSearchParams.status
        : undefined;
    const where = { status };

    const orderBy = resolvedSearchParams.orderBy && columnNames.includes(resolvedSearchParams.orderBy)
        ? { [resolvedSearchParams.orderBy]: 'asc' }
        : undefined;

    const page = parseInt(resolvedSearchParams.page || "1") || 1;
    const pageSize = parseInt(resolvedSearchParams.pageSize || "10") || 10;

    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
            assignedToUser: true
        }
    });

    const issueCount = await prisma.issue.count({ where });

    //await delay(2000)

    return (
        <Flex direction="column" gap="5">
            <IssueActions/>
            <IssueTable searchParams={resolvedSearchParams} issues={issues} />
            <Flex justify="between" align="center">
                <Pagination itemsCount={issueCount} currentPage={page} pageSize={pageSize} />
                <PageSizeSelect pageSize={pageSize} />
            </Flex>
        </Flex>

    );
};

export const dynamic = 'force-dynamic';
// export const revalidate = 0;

export const metadata: Metadata = {
    title: 'Issue Tracker - Issue List',
    description: 'View all project issues'
}
export default IssuesPage;