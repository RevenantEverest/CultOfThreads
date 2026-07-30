"use client"

import React, { useRef, useEffect } from 'react';
import { Table, TableBody } from '../shadcn/table';

interface TableFlatListRenderItemParams<T> {
    item: T,
    index: number,
    key?: string | number,
};

export interface TableFlatListProps<T> {
    className?: React.HTMLAttributes<HTMLDivElement>["className"],
    data: T[],
    renderItem: (params: TableFlatListRenderItemParams<T>) => React.ReactNode,
    keyExtractor: (item: T) => string | number,
    onEndReached?: () => void,
    renderLoading?: () => React.ReactNode,
    renderHeader?: () => React.ReactNode
    isLoading?: boolean,
};

function TableFlatList<T>(props: TableFlatListProps<T>) {

    const {
        data,
        renderItem,
        keyExtractor,
        onEndReached,
        renderLoading,
        renderHeader,
        isLoading
    } = props;

    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if(entries[0]?.isIntersecting && !isLoading) {
                if(onEndReached) onEndReached();
            }
        }, { threshold: 1.0 });

        if(sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            observer.disconnect();
        }
    }, [onEndReached, isLoading]);

    const renderList = () => {
        return data.map((item, index) => (
            renderItem({
                item,
                index,
                key: keyExtractor(item)
            })
        ));
    };

    return(
        <>
            <Table>
                {renderHeader && renderHeader()}
                <TableBody>
                    {renderList()}
                </TableBody>
            </Table>
            <div ref={sentinelRef} className="h-5" />
            {isLoading && (
                renderLoading ? 
                <div className="flex justify-center items-center">
                    {renderLoading()}
                </div> 
                : 
                <p>Loading...</p>
            )}
        </>
    );
};

export default TableFlatList;