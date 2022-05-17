import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionResolver } from './questions.resolve';
import { QuestionsService } from './questions.service';

@Module({
	imports: [TypeOrmModule.forFeature([Question])],
	providers: [QuestionResolver, QuestionsService],
})
export class QuestionsModule {}
