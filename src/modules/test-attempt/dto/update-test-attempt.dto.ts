import { PartialType } from '@nestjs/mapped-types';
import { CreateTestAttemptDto } from './create-test-attempt.dto';

export class UpdateTestAttemptDto extends PartialType(CreateTestAttemptDto) {}
