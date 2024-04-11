import { cn } from "@/lib/utils";
import { QuestionType } from "@prisma/client";

interface CardProps {
  id: string;
  text: string;
  selected?: boolean;
  onClick: () => void;
  shortcut: number;
  status?: "correct" | "wrong" | "none";
  disabled?: boolean;
  type: QuestionType;
}

const Card = ({
  id,
  text,
  selected,
  onClick,
  status,
  disabled,
  type,
  shortcut,
}: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 dark:hover:bg-white/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
        selected &&
          status === "correct" &&
          "border-green-300 bg-green-100 hover:bg-green-100",
        selected &&
          status === "wrong" &&
          "border-rose-300 bg-rose-100 hover:bg-rose-100",
        disabled &&
          "pointer-events-none hover:bg-white dark:hover:bg-black active:border-b-4"
      )}
    >
      <div className="relative max-h-[80px] lg:max-h-[150px] w-full">
        <p
          className={cn(
            "text-neutral-600 text-sm lg:text-base",
            selected && "text-sky-500",
            selected && status === "correct" && "text-green-500",
            selected && status === "wrong" && "text-rose-500"
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            "size-5 border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold absolute top-4 -right-2",
            selected && "border-sky-300 text-sky-500",
            selected &&
              status === "correct" &&
              "border-green-300 text-green-500",
            selected && status === "wrong" && "border-rose-300 text-rose-500"
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};

export default Card;