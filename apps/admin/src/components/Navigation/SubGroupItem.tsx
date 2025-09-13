import type { SidebarMenuItem as SidebarMenuItemType } from '@@admin/types/sidebar';

import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { 
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    useSidebar
} from '@repo/ui';
import { TiChevronRight } from "react-icons/ti";

function SubGroupItem({ title, icon, subRoutes }: SidebarMenuItemType) {

    const [open, setOpen] = useState(false);
    const { open: sidebarOpen } = useSidebar();

    const Icon = icon;

    const renderSubItem = () => {
        return subRoutes?.map((subItem) => {
                        
            return(
                <SidebarMenuSubItem key={subItem.title} className="hover:bg-card-light rounded-xl duration-150">
                    <SidebarMenuSubButton asChild>
                        <Link to={subItem.url} className="text-text">
                            <span className="font-semibold">{subItem.title}</span>
                        </Link>
                    </SidebarMenuSubButton>
                </SidebarMenuSubItem>
            );
        });
    };
    
    return(
        <Collapsible 
            defaultOpen 
            key={title}
            className="group/collapsible rounded-xl duration-150"
            onOpenChange={setOpen}
        >
            <SidebarMenuItem>
            <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild className="hover:bg-card-light">
                    <div className="w-full flex items-center">
                        <div className="flex items-center gap-2">
                            <Icon />
                            {sidebarOpen && <span className="font-semibold">{title}</span>}
                        </div>
                        <div className="flex flex-1 justify-end">
                            <TiChevronRight className={`${open && "rotate-90"} transition-transform duration-200 text-sm text-right`} />
                        </div>
                    </div>
                </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <SidebarMenuSub className="text-muted/80">
                    {renderSubItem()}
                </SidebarMenuSub>
            </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
};

export default SubGroupItem;