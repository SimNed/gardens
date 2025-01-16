import { Badge } from "@/app/components/shadcn-ui/badge";
import { SearchFormProps } from "@/types/search";

import { X } from "lucide-react";

interface FiltersBadgeGroupProps {
  badges: { key: keyof SearchFormProps; category: string; label: string }[];
  onDelete: (key: keyof SearchFormProps) => void;
}

const FiltersBadgeGroup = ({ badges, onDelete }: FiltersBadgeGroupProps) => {
  return (
    <div className="p-2 flex gap-2 flex-wrap">
      {badges.map((badge) => (
        <Badge
          key={badge.label}
          variant="outline"
          className="w-fit text-xs font-normal flex gap-2 cursor-default"
        >
          {badge.category.toLowerCase()}: {badge.label}
          <X
            className="w-3 h-3 hover:cursor-pointer"
            onClick={() => onDelete(badge.key)}
          />
        </Badge>
      ))}
    </div>
  );
};

export default FiltersBadgeGroup;
