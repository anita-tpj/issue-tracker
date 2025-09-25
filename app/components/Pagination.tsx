import React from 'react';
import {Button, Flex, Text} from "@radix-ui/themes";
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";

interface Props {
    itemsCount: number,
    currentPage: number,
    pageSize: number
}

const Pagination = ({itemsCount, currentPage, pageSize}: Props) => {
    const pageCount = Math.ceil(itemsCount / pageSize);

    if ( pageCount<=1 ) return null;
    return (
        <Flex gap="2" align="center">
            <Text size="2">Page {currentPage} of {pageCount}</Text>
            <Button color="gray" variant="soft" disabled={currentPage === 1}><DoubleArrowLeftIcon /></Button>
            <Button color="gray" variant="soft" disabled={currentPage === 1}><ChevronLeftIcon /></Button>
            <Button color="gray" variant="soft" disabled={currentPage === pageCount}><ChevronRightIcon /></Button>
            <Button color="gray" variant="soft" disabled={currentPage === pageCount}><DoubleArrowRightIcon/></Button>
        </Flex>
    );
};

export default Pagination;