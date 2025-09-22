'use client';

import type { Issue } from '@prisma/client';
import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton";

const IssueForm = dynamic(
    () => import('@/app/issues/_components/IssueForm'),
    { ssr: false, loading: () => <IssueFormSkeleton /> }
);

export default function IssueFormClient({ issue }: { issue?: Issue }) {
    return <IssueForm issue={issue} />;
}
