'use client'
import React from 'react';
import Link from "next/link";
import classNames from "classnames"
import {usePathname} from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
    const links =[
        {label: "Dashboard", href:"/"},
        {label: "Issues", href:"/issues"},
    ]

    const currentPath = usePathname()
    console.log(currentPath)
    return (
        <nav className="flex gap-6 h-14 mb-5 px-5 border-b items-center">
            <Link href="/"><AiFillBug /></Link>
            <ul className="flex gap-4">
                {links.map(link =>
                    <Link
                        className={classNames({
                            "text-zinc-900": link.href === currentPath,
                            "text-zinc-500": link.href !== currentPath,
                            " hover:text-zinc-800 transition-colors": true,
                        })}
                          key={link.href}
                          href={link.href}>
                        {link.label}</Link>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;