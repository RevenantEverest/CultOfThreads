import type { ContactFormSubmission } from '@repo/supabase';

import { FaCalendar, FaEnvelope, FaUser } from 'react-icons/fa6';
import { GrStatusGoodSmall } from 'react-icons/gr';

import { Card, CardContent } from '@repo/ui';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@repo/ui';
import ContactFormSubmissionListItem from './ContactFormSubmissionListItem';

interface ContactFormSubmissionListProps {
    submissions: ContactFormSubmission[],
    search: string
};

function ContactFormSubmissionList({ submissions, search }: ContactFormSubmissionListProps) {

    const headClass = "bg-card-light font-semibold";

    const contactsList = submissions.filter((el) => {
        if(search) {
            const name = el.first_name + " " + el.last_name;
            return name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        }

        return el;        
    });

    return(
        <Card>
            <CardContent className="py-8">
                <Table>
                    <TableHeader>
                        <TableRow className="font-bold border-b-muted hover:!bg-transparent">
                            <TableHead className={`${headClass} font-bold w-1/10 rounded-tl-lg`}></TableHead>
                            <TableHead className={`${headClass}`}>
                                <div className="flex items-center justify-start gap-2">
                                    <FaUser />
                                    Name <span className="text-xs text-accent font-semibold">({submissions.length})</span>
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
                                    <GrStatusGoodSmall />
                                    Status
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
                    <TableBody>
                        {
                            contactsList.sort((a, b) => {
                                const aName = a.first_name + " " + a.last_name;
                                const bName = b.first_name + " " + b.last_name;
                                return aName.localeCompare(bName)
                            }).map((submission) => (
                                <ContactFormSubmissionListItem key={submission.id} submission={submission} />
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ContactFormSubmissionList;
  