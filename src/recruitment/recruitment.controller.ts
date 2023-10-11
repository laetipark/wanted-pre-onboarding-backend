import {
  Controller,
  Post,
  HttpCode,
  Query,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { CreateRecruitmentDto } from '~/recruitment/dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from '~/recruitment/dto/update-recruitment.dto';

@Controller('recruitment')
export class RecruitmentController {
  constructor(private recruitmentService: RecruitmentService) {}

  @Post()
  @HttpCode(201)
  async insertRecruitment(@Body() data: CreateRecruitmentDto) {
    return await this.recruitmentService.addRecruitment({
      companyID: data.companyID,
      position: data.position,
      reward: data.reward,
      contents: data.contents,
      skill: data.skill,
    });
  }

  @Patch(':id')
  @HttpCode(201)
  async updateRecruitment(
    @Param('id') id: number,
    @Body() data: UpdateRecruitmentDto,
  ) {
    return await this.recruitmentService.setRecruitment(id, {
      position: data.position,
      reward: data.reward,
      contents: data.contents,
      skill: data.skill,
    });
  }
}
