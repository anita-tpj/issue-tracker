"use client"

import {Button, Flex, Text} from "@radix-ui/themes";
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {useRouter, useSearchParams} from "next/navigation";

interface Props {
    itemsCount: number,
    currentPage: number,
    pageSize: number
}

const Pagination = ({itemsCount, currentPage, pageSize}: Props) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    const router = useRouter();
    const searchParams = useSearchParams();

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push('?' + params.toString())
    }

    if ( pageCount<=1 ) return null;

    return (
        <Flex gap="2" align="center">
            <Text size="2">Page {currentPage} of {pageCount}</Text>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === 1}
                onClick={() => changePage(1)}
            >
                <DoubleArrowLeftIcon />
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage-1)}
            >
                <ChevronLeftIcon/>
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === pageCount}
                onClick={() => changePage(currentPage+1)}
            >
                <ChevronRightIcon/>
            </Button>
            <Button
                color="gray"
                variant="soft"
                disabled={currentPage === pageCount}
                onClick={() => changePage(pageCount)}
            >
                <DoubleArrowRightIcon/>
            </Button>
        </Flex>
    );
};

export default Pagination;