import type { ProductDetailsStatus } from '@repo/supabase';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui';

interface ProductStatusProps {
    value: string,
    onChange: (value: string) => void
};

function ProductStatus({ value, onChange }: ProductStatusProps) {

    return(
        <div className="flex flex-col">
            <p className="font-bold text-sm">Status: </p>
            <Select onValueChange={(value) => onChange(value)}>
                <SelectTrigger className="w-[180px] !bg-card-light border-0 font-semibold !h-11 rounded-lg mt-1.5">
                    <SelectValue placeholder={value ? (value.charAt(0) + value.substring(1).toLocaleLowerCase()) : "Draft"} />
                </SelectTrigger>
                <SelectContent className="font-semibold text-text border-background bg-card">
                    <SelectGroup>
                        <SelectItem value={("ACTIVE" as ProductDetailsStatus)}>Active</SelectItem>
                        <SelectItem value={("DRAFT" as ProductDetailsStatus)}>Draft</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default ProductStatus;