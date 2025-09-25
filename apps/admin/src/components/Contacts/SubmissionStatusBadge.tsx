import type { ContactFormSubmissionStatus } from '@repo/supabase';

type SubmissionStatusBadgeSize = "sm" | "md" | "lg";

interface SubmissionStatusBadgeProps {
    status: ContactFormSubmissionStatus,
    size?: SubmissionStatusBadgeSize
};

function SubmissionStatusBadge({ status, size="sm" }: SubmissionStatusBadgeProps) {

    const statusColor: Record<ContactFormSubmissionStatus, string> = {
        "PENDING": "bg-amber-600",
        "RESOLVED": "bg-green-600"
    };

    const sizeClass: Record<SubmissionStatusBadgeSize, string> = {
        "sm": "w-20 h-6 text-xs",
        "md": "w-25 h-9 text-sm",
        "lg": "w-30 h-11 text-md"
    };

    return(
        <div className={`${statusColor[status]} ${sizeClass[size]} rounded-full flex items-center justify-center`}>
            <p className="font-bold">{status.toUpperCase()}</p>
        </div>
    );
};

export default SubmissionStatusBadge;