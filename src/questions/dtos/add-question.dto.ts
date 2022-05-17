import { InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql"
import { CommonOutput } from "src/common/dtos/common.dto";
import { Question } from "../entities/question.entity";

@InputType()
export class AddQuestionInput extends PartialType(PickType(Question, ['kr', 'en'])) { }

@ObjectType()
export class AddQuestionOutput extends CommonOutput { }