"use client";

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    pageSize: number;
}

const PageSizeSelect = ({ pageSize }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sizes = [5, 10, 15, 20, 30, 50];

    return (
        <Select.Root
            value={pageSize.toString()}
            onValueChange={(value) => {
                const params = new URLSearchParams(searchParams.toString());
                if (value) {
                    params.set("pageSize", value);
                } else {
                    params.delete("pageSize");
                }
                params.delete("page");
                const query = params.toString();
                router.push(`/issues${query ? `?${query}` : ""}`);
            }}
        >
            <Select.Trigger placeholder="Page size..." />
            <Select.Content>
                <Select.Group>
                    {sizes.map((size) => (
                        <Select.Item key={size} value={size.toString()}>
                            {size}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default PageSizeSelect;
