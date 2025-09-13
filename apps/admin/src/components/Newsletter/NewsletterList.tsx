import type { NewsletterWithContact } from '@repo/supabase';

import { FaCalendar, FaEnvelope, FaUser } from 'react-icons/fa6';

import { Card, CardContent } from '@repo/ui';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@repo/ui';
import NewsletterListItem from './NewsletterListItem';

interface NewsletterListProps {
    submissions: NewsletterWithContact[],
    search: string
};

function NewsletterList({ submissions, search }: NewsletterListProps) {

    const headClass = "bg-card-light font-semibold";

    const contactsList = submissions.filter((el) => {
        if(search) {
            const name = (el.contact.first_name ?? "") + " " + (el.contact.last_name ?? "");
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
                                const aName = (a.contact.first_name && a.contact.last_name) ? a.contact.first_name + " " + a.contact.last_name : "";
                                const bName = (b.contact.first_name && b.contact.last_name) ? b.contact.first_name + " " + b.contact.last_name : "";
                                return aName.localeCompare(bName)
                            }).map((submission) => (
                                <NewsletterListItem key={submission.id} submission={submission} />
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default NewsletterList;
  