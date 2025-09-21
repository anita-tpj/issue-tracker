import React from 'react';
import {Badge} from "@radix-ui/themes";
import {Status} from "@prisma/client";

const StatusMap : Record<Status, {label: string, color: "red" | "violet" | "green"}> = {
    OPEN: {label: "Open", color: "red"},
    IN_PROGRESS: {label: "Open", color: "violet"},
    CLOSED: {label: "Open", color: "green"}
}

const IssueStatusBadge = ({status}: {status: Status}) => {
    return (
        <Badge color={StatusMap[status].color}>{StatusMap[status].label}</Badge>
    );
};

export default IssueStatusBadge;