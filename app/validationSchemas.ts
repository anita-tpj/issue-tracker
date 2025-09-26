import {z} from "zod";
import {Status} from ".prisma/client";

export const issueSchema = z.object({
    title: z.string().min(1, 'Title field is required').max(255),
    description: z.string().min(1, "Description field is required.").max(65535),
})

export const patchIssueSchema = z.object({
    title: z.string().min(1, 'Title field is required').max(255).optional(),
    description: z.string().min(1, "Description field is required.").max(65535).optional(),
    assignedToUserId: z.string().min(1, 'AssignedToUserId').max(255).optional().nullable(),
    status: z.nativeEnum(Status).optional()
})