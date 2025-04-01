import { Answers as AnswerPrisma } from '@prisma/client';

export class Answer implements AnswerPrisma {
  id: number;
  body: string;
  question_id: number;
  createdAt: Date;
  updatedAt: Date;
  user_id: number;
}
