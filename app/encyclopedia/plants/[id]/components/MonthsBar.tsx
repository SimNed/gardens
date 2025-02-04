import { getShortenedMonths } from "@/app/lib/utils/month";
import { cn } from "@/app/lib/utils/style";
import { MonthVariantType } from "@/types/variant";

const defaultVariant = {
  label: "",
  color: "text-black",
};

const cultureVariant = {
  label: "culture",
  color: "text-green-600",
};

const harvestVariant = {
  label: "récolte",
  color: "text-orange-600",
};

interface MonthsBarProps {
  months: number[];
  variant?: MonthVariantType;
}

const MonthsBar = ({ months, variant = "default" }: MonthsBarProps) => {
  let variantData = {
    label: "",
    color: "",
  };

  switch (variant) {
    case "culture":
      variantData = cultureVariant;
      break;

    case "harvest":
      variantData = harvestVariant;
      break;

    default:
      variantData = defaultVariant;
      break;
  }

  const colorClass = cn("font-extrabold", variantData.color);

  return (
    <div className="grid grid-cols-3">
      {variantData.label && (
        <p className="col-span-1 p-0">{variantData.label}</p>
      )}
      <ul className="col-span-2 flex justify-between text-black">
        {getShortenedMonths().map((m, index) => (
          <li
            key={index}
            className={
              months.includes(index + 1) ? colorClass : "text-gray-300"
            }
          >
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthsBar;
