import React from 'react';
import {Box, Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDeatilPage = () => {
    return (
        <Box className="max-w-xl">
            <Skeleton />
            <Flex gap="3" my="2">
                <Skeleton width="5rem" />
                <Skeleton width="8rem" />
            </Flex>
            <Card className="prose" mt="4">
                <Skeleton count={3} />
            </Card>
        </Box>
    );
};

export default LoadingIssueDeatilPage;