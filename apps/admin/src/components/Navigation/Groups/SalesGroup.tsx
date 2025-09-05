import { 
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
} from '@repo/ui';
import GroupItem from '../GroupItem';

import { FaBoxesPacking, FaCashRegister } from 'react-icons/fa6';

// Menu items.
const items = [
    {
      title: "Products",
      url: "/dashboard/products",
      icon: FaBoxesPacking,
    },
    {
        title: "Sales",
        url: "/dashboard/sales",
        icon: FaCashRegister
    }
]

function SalesGroup() {

    const renderMenu = () => {
        return items.map((item) => (
            <GroupItem key={item.title} {...item} />
        ));
    };

    return(
        <SidebarGroup>
            <SidebarGroupLabel className="font-semibold text-muted">Sales</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {renderMenu()}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default SalesGroup;