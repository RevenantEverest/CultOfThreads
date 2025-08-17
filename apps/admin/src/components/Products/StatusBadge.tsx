import type { ProductDetailsStatus } from '@repo/supabase';

type StatusBadgeSize = "sm" | "md" | "lg";

interface StatusBadgeProps {
    status: ProductDetailsStatus,
    size?: StatusBadgeSize
};

function StatusBadge({ status, size="sm" }: StatusBadgeProps) {

    const statusColor: Record<ProductDetailsStatus, string> = {
        "ACTIVE": "bg-green-600",
        "DRAFT": "bg-muted"
    };

    const sizeClass: Record<StatusBadgeSize, string> = {
        "sm": "w-15 h-5 text-xs",
        "md": "w-20 h-8 text-sm",
        "lg": "w-25 h-10 text-md"
    };

    return(
        <div className={`${statusColor[status]} ${sizeClass[size]} rounded-full flex items-center justify-center`}>
            <p className="font-bold">{status.toUpperCase()}</p>
        </div>
    );
};

export default StatusBadge;