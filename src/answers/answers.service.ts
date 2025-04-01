import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';
import { connect } from 'http2';

@Injectable()
export class AnswersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createAnswerDto: CreateAnswerDto,
    question_id: number,
    user_id: number,
  ) {
    return await this.prisma.answers.create({
      data: {
        ...createAnswerDto,
        user: { connect: { id: user_id } },
        questions: { connect: { id: question_id } },
      },
    });
  }

  async findAll() {
    return await this.prisma.answers.findMany({
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        questions: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.answers.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        questions: true,
      },
    });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return await this.prisma.answers.update({
      where: { id },
      data: updateAnswerDto,
    });
  }

  async remove(id: number) {
    return this.prisma.answers.delete({ where: { id } });
  }
}
