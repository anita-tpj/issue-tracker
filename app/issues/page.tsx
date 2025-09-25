import {Flex} from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueActions from "@/app/issues/IssueActions";
import {Status} from ".prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, {columnNames, IssueQuery} from "@/app/issues/IssueTable";
import delay from "delay";

interface Props {
    searchParams: IssueQuery
}

const IssuesPage = async ({searchParams} : Props) => {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
    const where = { status };

    const orderBy = columnNames
        .includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: 'asc' }
        : undefined;

    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const issueCount = await prisma.issue.count({ where });

    //await delay(2000)

    return (
        <Flex direction="column" gap="5">
            <IssueActions/>
            <IssueTable searchParams={searchParams} issues={issues} />
            <Pagination itemsCount={issueCount} currentPage={page} pageSize={pageSize} />
        </Flex>

    );
};

export const dynamic = 'force-dynamic';
// export const revalidate = 0;
export default IssuesPage;