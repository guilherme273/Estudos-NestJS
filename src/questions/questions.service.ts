import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto, user_id: number) {
    return await this.prisma.questions.create({
      data: { ...createQuestionDto, user_id },
    });
  }

  async findAll() {
    return this.prisma.questions.findMany({
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        answers: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.questions.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        answers: true,
      },
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.prisma.questions.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.questions.delete({ where: { id } });
  }
}
