import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CommonOutput } from "src/common/dtos/common.dto";
import { Question } from "../entities/question.entity";

@InputType()
export class EditQuestionInput extends PartialType(PickType(Question, ['id', 'kr', 'en', 'status', 'failCount'])) { }

@ObjectType()
export class EditQuestionOutput extends CommonOutput { }