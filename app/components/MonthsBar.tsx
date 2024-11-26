import { MONTH_INDEXES } from "@/lib/consts";
import { cn } from "@/lib/utils";

interface MonthsBarProps {
  months: number[];
  variant?: "default" | "culture" | "harvest";
}

const MonthsBar = ({ months, variant = "default" }: MonthsBarProps) => {
  const variantData = {
    label: "",
    color: "",
  };

  switch (variant) {
    case "culture":
      variantData.label = "culture";
      variantData.color = "text-green-600";
      break;

    case "harvest":
      variantData.label = "récolte";
      variantData.color = "text-orange-600";
      break;

    default:
      variantData.color = "text-black";
      break;
  }

  const colorClass = cn("font-extrabold", variantData.color);

  return (
    <div className="grid grid-cols-3">
      {variant !== "default" && (
        <p className="col-span-1">{variantData.label}</p>
      )}
      <ul className="col-span-2 flex justify-between text-black">
        {MONTH_INDEXES.map((m, index) => (
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
