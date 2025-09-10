import { 
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu
} from '@repo/ui';

import GroupItem from '../GroupItem';

import { MdPermContactCalendar } from 'react-icons/md';
import { FaEnvelopeOpenText, FaNewspaper } from 'react-icons/fa6';

const items = [
    {
      title: "Contacts",
      url: "/dashboard/contacts",
      icon: MdPermContactCalendar,
    },
    {
      title: "Contact Form",
      url: "/dashboard/contactForm",
      icon: FaEnvelopeOpenText,
    },
    {
        title: "Newsletter",
        url: "/dashboard/newsletter",
        icon: FaNewspaper
    }
]

function ContactsGroup() {

    const renderMenu = () => {
        return items.map((item) => (
            <GroupItem key={item.title} {...item} />
        ));
    };

    return(
        <SidebarGroup>
            <SidebarGroupLabel className="font-semibold text-muted">Contacts</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {renderMenu()}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default ContactsGroup;