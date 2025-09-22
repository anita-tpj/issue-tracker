'use client'
import React from 'react';
import Link from "next/link";
import classNames from "classnames"
import {usePathname} from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import {Box, Container, Flex} from "@radix-ui/themes";
import {useSession} from "next-auth/react";

const NavBar = () => {
    const links =[
        {label: "Dashboard", href:"/"},
        {label: "Issues", href:"/issues"},
    ]

    const currentPath = usePathname()
    const { status, data: session } = useSession();

    return (
        <nav className="py-3 mb-5 px-5 border-b">
           <Container>
            <Flex justify="between">
                <Flex gap="2" align="center">
                    <Link href="/"><AiFillBug /></Link>
                    <ul className="flex gap-4">
                        {links.map(link =>
                            <li key={link.href}>
                                <Link
                                    className={classNames({
                                        "text-zinc-900": link.href === currentPath,
                                        "text-zinc-500": link.href !== currentPath,
                                        " hover:text-zinc-800 transition-colors": true,
                                    })}
                                    href={link.href}>
                                    {link.label}</Link>
                            </li>
                        )}
                    </ul>
                </Flex>
                <Box>
                    {status === 'authenticated' && <Link href="/api/auth/signout">Log Out</Link>}
                    {status === 'unauthenticated' && <Link href="/api/auth/signin">Log In</Link>}
                </Box>
            </Flex>
            </Container>
        </nav>
    );
};

export default NavBar;