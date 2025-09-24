'use client'
import { Select } from "@radix-ui/themes";
import React, {useEffect, useState} from 'react';
import {Issue, User} from ".prisma/client";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@/app/components";

const AssigneeSelect = ({issue}: {issue: Issue}) => {

    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () =>  axios.get('/api/users').then(res => res.data),
        staleTime: 60 * 1000, // 60 sec
        retry: 3
    })

    if(isLoading) return <Skeleton/>

    if(error) return null

    const assignIssue = (userId: string) => {
        axios
            .patch("/api/issues/" + issue.id, {
                assignedToUserId: (userId && userId !== " ") ?  userId : null,
            })
            .catch(() => {
                //toast.error("Changes could not be saved.");
                console.log('Changes could not be saved.')
            });
    };

    // const [users, setUsers] = useState<User[]>([])
    //
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //        const {data} = await axios.get<User[]>('/api/users')
    //         setUsers(data)
    //     }
    //
    //     fetchUsers();
    // }, []);

    return (
        <Select.Root defaultValue={issue.assignedToUserId || " "} onValueChange={assignIssue}>
            <Select.Trigger placeholder="Assignee..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value=" ">Unassigned</Select.Item>
                    {users?.map(user =>
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;