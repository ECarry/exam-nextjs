import { z } from "zod";

export const AnswerSchema = z.object({
  answer: z.string(),
  isCorrect: z.boolean(),
});

export const NewQuestionSchema = z.object({
  question: z.string().min(1, {
    message: "Question must be required",
  }),
  type: z.enum(["MCQ", "MRQ", "TRUE_FALSE", "SHORT_ANSWER"]),
  image: z.string().optional(),
  explanation: z.string().optional(),
  subjectId: z.string(),
  answers: z.array(AnswerSchema),
});