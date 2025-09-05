import { Link } from '@tanstack/react-router';
import { 
    Collapsible,
    IMAGE_RESOURCES,
    Sidebar, 
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenuButton,
    useSidebar
} from '@repo/ui';

import { 
    ContactsGroup, 
    EventsGroup, 
    OverviewGroup, 
    SalesGroup, 
    SidebarUser 
} from '@@admin/components/Navigation';

function AppSidebar() {

    const { open } = useSidebar();

    return(
        <Sidebar className="!border-card-light border-none" collapsible="icon">
            <Collapsible defaultOpen className="group/collapsible">
                <SidebarHeader className="bg-card text-center flex items-center justify-center">
                        <SidebarMenuButton
                            className={`
                                data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground
                                flex flex-col gap-2 h-26 mt-2 data-[slot="sidebar-menu-button"]:!p-0
                            `}
                        >
                            <Link to="/">
                                <img 
                                    src={IMAGE_RESOURCES.LOGO_CIRCLE}
                                    className={`
                                        ${
                                            open ? 
                                            "w-15" : 
                                            "w-20" 
                                        }
                                        relative transition-all duration-300 ease-in-out
                                    `} 
                                />
                            </Link>
                            <Link to="/">
                                <span className="uppercase font-bold">Cult of Threads</span>
                            </Link>
                        </SidebarMenuButton>
                </SidebarHeader>
            </Collapsible>
            <SidebarContent className="bg-card">
                <OverviewGroup />
                <SalesGroup />
                <EventsGroup />
                <ContactsGroup />
            </SidebarContent>
            <SidebarFooter className="bg-card">
                <SidebarUser />
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;