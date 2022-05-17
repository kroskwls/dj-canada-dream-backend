import { Field, ObjectType } from "@nestjs/graphql";
import { CommonOutput } from "src/common/dtos/common.dto";
import { Question } from "../entities/question.entity";

@ObjectType()
export class AllQuestionsOutput extends CommonOutput {
	@Field(type => [Question], { nullable: true })
	questions?: Question[];
}