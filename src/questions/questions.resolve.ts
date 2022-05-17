import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AddQuestionInput, AddQuestionOutput } from "./dtos/add-question.dto";
import { AllQuestionsOutput } from "./dtos/all-questions.dto";
import { DeleteQuestionInput, DeleteQuestionOutput } from "./dtos/delete-question.dto";
import { EditQuestionInput, EditQuestionOutput } from "./dtos/edit-question.dto";
import { Question } from "./entities/question.entity";
import { QuestionsService } from "./questions.service";

@Resolver(of => Question)
export class QuestionResolver {
	constructor(private readonly service: QuestionsService) { }

	@Query(returns => AllQuestionsOutput)
	allQuestions(): Promise<AllQuestionsOutput> {
		return this.service.allQuestions();
	}

	@Mutation(returns => AddQuestionOutput)
	addQuestion(@Args('input') input: AddQuestionInput): Promise<AddQuestionOutput> {
		return this.service.addQuestion(input);
	}

	@Mutation(returns => EditQuestionOutput)
	editQuestion(@Args('input') input: EditQuestionInput): Promise<EditQuestionOutput> {
		return this.service.editQuestion(input);
	}

	@Mutation(returns => DeleteQuestionOutput)
	deleteQuestion(@Args('input') input: DeleteQuestionInput): Promise<DeleteQuestionOutput> {
		return this.service.deleteQuestion(input);
	}
}