import { Field, InputType, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CommonEntity } from "src/common/entities/common.entity";
import { Column, Entity } from "typeorm";

export enum QuestionStatus {
	PASS = 'PASS',
	FAIL = 'FAIL'
}
registerEnumType(QuestionStatus, { name: 'QuestionStatus' });

@InputType('QuestionInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Question extends CommonEntity {
	@Field(type => String)
	@Column()
	kr: string;

	@Field(type => String)
	@Column()
	en: string;

	@Field(type => QuestionStatus, { defaultValue: QuestionStatus.FAIL })
	@Column({ default: QuestionStatus.FAIL })
	status?: QuestionStatus;

	@Field(type => Int, { defaultValue: 0 })
	@Column({ default: 0 })
	failCount: number;
}