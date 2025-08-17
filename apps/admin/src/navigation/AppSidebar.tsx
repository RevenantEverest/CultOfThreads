import { 
    Sidebar, 
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from '@repo/ui';

import { 
    ContactsGroup, 
    EventsGroup, 
    OverviewGroup, 
    SalesGroup, 
    SidebarUser 
} from '@@admin/components/Navigation';

function AppSidebar() {

    return(
        <Sidebar className="!border-card-light border-none">
            <SidebarHeader className="bg-card text-center">
                <h1 className="font-bold">Cult of Threads</h1>
                <p className="font-semibold text-muted">Admin</p>
            </SidebarHeader>
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