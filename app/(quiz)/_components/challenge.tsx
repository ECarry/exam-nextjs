import { cn } from "@/lib/utils";
import { Answer, QuestionType } from "@prisma/client";
import Card from "./card";

interface ChallengeProps {
  answers: Answer[];
  onSelect: (id: string) => void;
  onInput: (value: string) => void;
  inputValue?: string;
  status: "correct" | "wrong" | "none" | "complete";
  selectedOption?: string;
  selectedOptions?: string[];
  disabled?: boolean;
  type: QuestionType;
}

const Challenge = ({
  answers,
  onSelect,
  onInput,
  status,
  inputValue,
  selectedOption,
  disabled,
  type,
  selectedOptions,
}: ChallengeProps) => {
  const handleSelect = (id: string) => {
    if (type === "MCQ" || "TRUE_FALSE") {
      onSelect(id);
    } else {
    }
  };

  return (
    <div className={cn("grid gap-2  grid-cols-1")}>
      {answers.map((answer, i) => (
        <Card
          key={answer.id}
          id={answer.id}
          text={answer.answer}
          shortcut={i + 1}
          inputValue={inputValue}
          onClick={() => handleSelect(answer.id)}
          type={type}
          status={status}
          selected={
            type === "MCQ" || type === "TRUE_FALSE"
              ? selectedOption === answer.id
              : selectedOptions?.includes(answer.id)
          }
          disabled={disabled}
          onInput={onInput}
        />
      ))}
    </div>
  );
};

export default Challenge;
