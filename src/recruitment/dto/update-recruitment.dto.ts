import { PartialType, OmitType } from '@nestjs/mapped-types';

import { CreateRecruitmentDto } from './create-recruitment.dto';

export class UpdateRecruitmentDto extends PartialType(
  OmitType(CreateRecruitmentDto, ['companyID'] as const),
) {}
