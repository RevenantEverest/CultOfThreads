"use client"

import { useRef } from 'react';
import Search from '@@shop/components/Search';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

function ProductSearch() {
    
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = (term: string) => {
        if(debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if(term.trim()) {
                params.set("search", term);
            }
            else {
                params.delete("search");
            }

            router.replace(`${pathname}?${params.toString()}`)
        }, 500);
    };

    return(
        <div className="w-full md:w-4/12">
            <Search setSearch={handleSearch} />
        </div>
    );
};

export default ProductSearch;