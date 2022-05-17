import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CommonOutput } from "src/common/dtos/common.dto";
import { Question } from "../entities/question.entity";

@InputType()
export class DeleteQuestionInput extends PickType(Question, ['id']) { }

@ObjectType()
export class DeleteQuestionOutput extends CommonOutput { }