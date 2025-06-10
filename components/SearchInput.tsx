'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils'


const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams()
    const query = searchParams.get('topic') || '';
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(()=>{
            if (searchQuery) {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "topic",
                value: searchQuery,
            });
            router.push(newUrl, {
                scroll: false,})
        }else if(pathname === '/companions') {
            // If the search query is empty and we are on the companions page, reset the topic filter
            const newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ['topic'],
            })
            router.push(newUrl, {
                scroll: false,
            });
        }
        }, 500)
        
    }, [searchQuery, router, searchParams, pathname])

    return (
        <div className="flex w-full max-w-sm items-center gap-2">
            <div className="flex items-center border border-gray-600 rounded-md overflow-hidden w-full focus-within:border-black transition-colors">
                <span className="flex justify-center px-3 text-gray-500 h-9 w-10">
                    <Image src="/icons/search.svg" width={30} height={30} alt="search" />
                </span>
                <input
                    type="text"
                    placeholder="Search companions"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 flex-1 border-none focus:border-none focus:ring-0 outline-none text-sm"
                />
            </div>
        </div>
    )
}

export default SearchInput
