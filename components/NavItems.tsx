'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { cn } from '@/lib/utils'

const navItems = [
    { label: "Home", href: "/" },
    { label: "Companion", href: "/companions" },
    { label: "Profile", href: "/my-journey" }
]

const NavItems = () => {
    const pathName = usePathname()
    return (
        <div className='flex gap-8'>
            {navItems.map(({ label, href }) => (
                <Link href={href} key={label} className={cn(pathName===href && 'text-primary font-semibold underline underline-offset-4 text-purple-600')}>{label}</Link>
            ))}
        </div>
    )
}

export default NavItems
