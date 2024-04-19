"use client";

import { Answer, Question } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addWrongQuestion } from "@/actions/question";
import { useWindowSize } from "react-use";

import Header from "./header";
import { Badge } from "@/components/ui/badge";
import QuestionBubble from "./question-bubble";
import Challenge from "./challenge";
import Footer from "./footer";

import Tip from "./tip";
import Confetti from "react-confetti";

interface QuestionWithAnswer extends Question {
  answers: Answer[];
}

interface Props {
  questions: QuestionWithAnswer[];
}

const Quiz = ({ questions }: Props) => {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [status, setStatus] = useState<
    "none" | "correct" | "wrong" | "complate"
  >("none");

  const currentQuestionData = questions[currentQuestionIndex];
  const answers = currentQuestionData?.answers || [];

  const onNext = () => {
    setCurrentQuestionIndex((current) => current + 1);
  };

  const onSelect = (id: string) => {
    if (status !== "none") return;

    setSelectedOption(id);
  };

  const onContiune = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = answers.find((answer) => answer.isCorrect === true);

    if (correctOption && correctOption.id === selectedOption) {
      setStatus("correct");
    } else {
      setStatus("wrong");
      addWrongQuestion(currentQuestionData.id).then((data) => {
        console.log(data?.success);
      });
    }
  };

  if (!currentQuestionData) {
    return (
      <>
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
          width={width}
          height={height}
        />
        <div className="flex flex-col items-center justify-center w-full h-full gap-y-4 max-w-lg mx-auto ">
          <h1 className="text-[100px]">🎊</h1>
          <h1 className="text-lg text-center font-bold">
            Great job! <br /> You&apos;ve completed.
          </h1>
        </div>
        <Footer
          onCheck={() => router.push("/main")}
          status={"complate"}
          disabled={false}
        />
      </>
    );
  }

  const BadgeType = () => {
    switch (currentQuestionData.type) {
      case "MCQ":
        return <Badge>单选题</Badge>;
      case "MRQ":
        return <Badge variant="destructive">多选题</Badge>;
      case "TRUE_FALSE":
        return <Badge variant="outline">判断题</Badge>;
      case "SHORT_ANSWER":
        return <Badge variant="secondary">简答题</Badge>;
    }
  };

  return (
    <>
      <Header current={currentQuestionIndex} total={questions.length} />
      <div className="flex-1 relative">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col lg:gap-y-12 gap-y-6">
            <div className="flex items-center justify-center">
              <BadgeType />
            </div>
            {/* <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {currentQuestionIndex + 1}、{currentQuestionData.question}
            </h1> */}
            <div className="">
              <QuestionBubble question={currentQuestionData.question} />
              <Challenge
                answers={answers}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={false}
                type={currentQuestionData.type}
              />
            </div>
          </div>
        </div>
        <div className="absolute top-8 right-8">
          {currentQuestionData.explanation && (
            <Tip content={currentQuestionData.explanation} />
          )}
        </div>
      </div>
      <Footer onCheck={onContiune} status={status} disabled={!selectedOption} />
    </>
  );
};

export default Quiz;
