import { FaCalendar, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa6';
import {
    TableHead,
    TableHeader,
    TableRow,
} from '@repo/ui';

interface ContactsHeaderProps {
    dataAmount: number
};

function ContactsHeader({ dataAmount }: ContactsHeaderProps) {

    const headClass = "bg-card-light font-semibold";

    return(
        <TableHeader>
            <TableRow className="font-bold border-b-muted hover:bg-transparent!">
                <TableHead className={`${headClass} font-bold w-1/10 rounded-tl-lg`}></TableHead>
                <TableHead className={`${headClass}`}>
                    <div className="flex items-center justify-start gap-2">
                        <FaUser />
                        Name <span className="text-xs text-accent font-semibold">({dataAmount})</span>
                    </div>
                </TableHead>
                <TableHead className={`${headClass} text-center`}>
                    <div className="flex items-center gap-2">
                        <FaEnvelope />
                        Email
                    </div>
                </TableHead>
                <TableHead className={`${headClass} text-center`}>
                    <div className="flex items-center gap-2">
                        <FaPhone />
                        Phone
                    </div>
                </TableHead>
                <TableHead className={`${headClass} text-center`}>
                    <div className="flex items-center gap-2">
                        <FaCalendar />
                        Created At
                    </div>
                </TableHead>
                <TableHead className={`${headClass} text-right rounded-tr-lg`}>Actions</TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default ContactsHeader;