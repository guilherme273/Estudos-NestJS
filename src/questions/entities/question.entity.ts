import { Questions as QuestionsPrisma } from '@prisma/client';

export class Question implements QuestionsPrisma {
  id: number;
  title: string;
  body: string;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
}
