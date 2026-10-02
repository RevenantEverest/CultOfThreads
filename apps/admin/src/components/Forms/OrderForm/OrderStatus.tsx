import type { Order } from '@repo/entities';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui';
import { statusColor } from '@@admin/components/Orders/OrderStatusBadge';

interface OrderStatusProps {
    value: Order["status"],
    onChange: (value: Order["status"]) => void
};

function OrderStatus({ value, onChange }: OrderStatusProps) {

    const renderStatusDisplayName = (str: string) => {
        return str.charAt(0) + str.substring(1).toLowerCase();
    };

    const availableStatuses: Order["status"][] = [
        "CANCELLED",
        "COMPLETE",
        "PAID",
        "PENDING",
        "REFUNDED",
        "SHIPPED"
    ];

    const renderStatuses = () => {
        return availableStatuses.map((item) => {
            return(
                <SelectItem key={`order-status-select-${item}`} value={item}>
                    <div 
                        className={`
                            h-3 w-3 rounded-full
                            ${statusColor[item]}
                        `} 
                    />
                    {renderStatusDisplayName(item)}
                </SelectItem>
            );
        });
    }

    return(
        <div className="flex flex-col w-full">
            <p className="font-bold text-sm">Status: </p>
            <Select value={value} onValueChange={(value) => onChange(value as Order["status"])}>
                <SelectTrigger className="w-full bg-card-light! border-0 font-semibold h-11! rounded-lg mt-1.5">
                    <SelectValue placeholder={renderStatusDisplayName(value)} />
                </SelectTrigger>
                <SelectContent className="font-semibold text-text border-background bg-card">
                    <SelectGroup>
                        {renderStatuses()}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default OrderStatus;