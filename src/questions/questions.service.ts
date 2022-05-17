import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddQuestionInput, AddQuestionOutput } from './dtos/add-question.dto';
import { AllQuestionsOutput } from './dtos/all-questions.dto';
import { DeleteQuestionInput, DeleteQuestionOutput } from './dtos/delete-question.dto';
import { EditQuestionInput, EditQuestionOutput } from './dtos/edit-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
	constructor(
		@InjectRepository(Question)
		private readonly repository: Repository<Question>
	) { }

	async allQuestions(): Promise<AllQuestionsOutput> {
		try {
			const questions = await this.repository.find();

			return { ok: true, questions };
		} catch (error) {
			return { ok: false, error };
		}
	}

	async addQuestion(input: AddQuestionInput): Promise<AddQuestionOutput> {
		try {
			const entity = this.repository.create(input);
			await this.repository.save(entity);

			return { ok: true };
		} catch (error) {
			return { ok: false, error };
		}
	}

	async editQuestion(input: EditQuestionInput): Promise<EditQuestionOutput> {
		try {
			const question = await this.repository.findOne(input.id);
			if (!question) {
				return { ok: false, error: 'Could not found question.' };
			}
			await this.repository.save(input);

			return { ok: true };
		} catch (error) {
			return { ok: false, error };
		}
	}

	async deleteQuestion({ id }: DeleteQuestionInput): Promise<DeleteQuestionOutput> {
		try {
			const question = await this.repository.findOne(id);
			if (!question) {
				return { ok: false, error: 'Could not found question.' };
			}
			await this.repository.delete(id);

			return { ok: true };
		} catch (error) {
			return { ok: false, error };
		}
	}
}
