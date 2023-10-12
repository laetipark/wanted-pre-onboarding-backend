import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  HttpCode,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { CreateRecruitmentDto } from '~/recruitment/dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from '~/recruitment/dto/update-recruitment.dto';
import { User } from '~/user/user.entity';

@Controller('recruitment')
export class RecruitmentController {
  constructor(private recruitmentService: RecruitmentService) {}

  @Get()
  @HttpCode(200)
  async selectRecruitments(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('rows') rows: number,
    @Query('sort') sort: string,
  ) {
    return await this.recruitmentService.getRecruitments({
      search: search || '',
      page: page || 1,
      rows: rows || 10,
      sort: sort || 'DESC',
    });
  }

  @Get(':id')
  @HttpCode(200)
  async selectRecruitment(@Param('id') id: number) {
    return await this.recruitmentService.getRecruitment(id);
  }

  @Post()
  @HttpCode(201)
  async insertRecruitment(@Body() data: CreateRecruitmentDto) {
    return await this.recruitmentService.addRecruitment({
      companyID: data.companyID,
      position: data.position,
      reward: data.reward,
      content: data.content,
      skill: data.skill,
    });
  }

  @Post(':id/apply')
  @HttpCode(201)
  async insertApplication(@Param('id') id: number, @Body() user: User) {
    return await this.recruitmentService.addApplication(id, {
      userID: user.userID,
    });
  }

  @Patch(':id')
  @HttpCode(200)
  async updateRecruitment(
    @Param('id') id: number,
    @Body() data: UpdateRecruitmentDto,
  ) {
    return await this.recruitmentService.setRecruitment(id, {
      position: data.position,
      reward: data.reward,
      content: data.content,
      skill: data.skill,
    });
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteRecruitment(@Param('id') id: number) {
    return await this.recruitmentService.removeRecruitment(id);
  }
}
