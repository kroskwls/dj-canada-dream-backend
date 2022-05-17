import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './questions/entities/question.entity';
import { QuestionsModule } from './questions/questions.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			// true인 경우 어떤 service에서든지 접근이 가능하도록 설정
			// false인 경우 해당 module에서 imports해야 사용이 가능함
			isGlobal: false,
			envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
			ignoreEnvFile: process.env.NODE_ENV === 'production',
			validationSchema: Joi.object({
				NODE_ENV: Joi.string().valid('dev', 'production', 'test').required(),
				DB_HOST: Joi.string(),
				DB_PORT: Joi.string(),
				DB_USERNAME: Joi.string(),
				DB_PASSWORD: Joi.string(),
				DB_NAME: Joi.string(),
			})
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			...(
				process.env.DATABASE_URL ? ({
					url: process.env.DATABASE_URL,
				}) : ({
					host: process.env.DB_HOST,
					port: +process.env.DB_PORT,
					username: process.env.DB_USERNAME,
					password: process.env.DB_PASSWORD,
					database: process.env.DB_NAME,
				})
			),
			// synchronize: process.env.NODE_ENV !== 'production',
			synchronize: true,
			// logging: process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
			logging: false,
			entities: [Question]
		}),
		GraphQLModule.forRoot({
			autoSchemaFile: true
		}),
		QuestionsModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }