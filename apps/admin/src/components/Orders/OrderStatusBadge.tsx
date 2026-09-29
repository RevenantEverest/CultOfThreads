import type { Order } from '@repo/entities'

type OrderStatusBadgeSize = "sm" | "md" | "lg";

interface OrderStatusBadgeProps {
    status: Order["status"],
    size?: OrderStatusBadgeSize
};

export const statusColor: Record<Order["status"], string> = {
    "PENDING": "bg-amber-700",
    "PAID": "bg-green-700",
    "SHIPPED": "bg-teal-700",
    "COMPLETE": "bg-primary",
    "CANCELLED": "bg-gray-600",
    "REFUNDED": "bg-red-600"
};

export default function OrderStatusBadge({ status, size="sm" }: OrderStatusBadgeProps) {

    const sizeClass: Record<OrderStatusBadgeSize, string> = {
        "sm": "w-20 h-6 text-xs",
        "md": "w-25 h-9 text-sm",
        "lg": "w-30 h-11 text-md"
    };

    return(
        <div 
            className={`
                ${statusColor[status]} ${sizeClass[size]} 
                rounded-full flex items-center justify-center
            `}
        >
            <p className="font-bold">{status.toUpperCase()}</p>
        </div>
    );
};