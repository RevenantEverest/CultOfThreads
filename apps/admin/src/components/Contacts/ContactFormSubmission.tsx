import type { ContactFormSubmissionStatus, ContactFormSubmission as ContactFormSubmissionType } from '@repo/supabase';

import { Link } from '@tanstack/react-router';
import { Card, CardContent, Button } from '@repo/ui';
import { FaClock, FaEnvelope } from 'react-icons/fa6';
import dayjs from 'dayjs';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import SubmissionStatusBadge from './SubmissionStatusBadge';

interface ContactFormSubmissionProps {
    submission: ContactFormSubmissionType
};

function ContactFormSubmission({ submission }: ContactFormSubmissionProps) {

    const createdAt = dayjs(submission.created_at).format("MMMM D, YYYY");

    return(
        <div className="flex flex-col gap-5">
            <Link to="/dashboard/contacts/form">
                <Button colorScheme={"cardLight"}>
                    <FaLongArrowAltLeft />
                    Back To Contact Form List
                </Button>
            </Link>
            <Card>
                <CardContent className="flex flex-col md:flex-row items-start md:items-center gap-5 pb-0 py-5">
                    <div className="flex flex-col gap-2 order-2 md:order-1">
                        <div>
                            <p className="text-xl font-bold">{submission.first_name + " " + submission.last_name}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <FaEnvelope />
                            <p className="font-semibold">{submission.email}</p>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start md:items-end gap-2 order-1 md:order-2 text-sm">
                        <div className="flex justify-start">
                            <SubmissionStatusBadge status={submission.status as ContactFormSubmissionStatus} size="sm" />
                        </div>
                        <div className="flex items-center gap-2">
                            <FaClock className="block md:hidden mt-0.5" />
                            <p className="font-semibold">{createdAt}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="flex items-center pb-0 py-5">
                    <div className="w-full">
                        <p className="font-bold mb-1.5">Message:</p>
                        <div className="bg-card-light w-full p-4 rounded-lg">
                            {submission.message}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ContactFormSubmission;