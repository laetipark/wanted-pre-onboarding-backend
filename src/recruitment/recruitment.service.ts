import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Recruitment } from './recruitment.entity';
import { Company } from '~/company/company.entity';

import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectRepository(Company)
    private company: Repository<Company>,
    @InjectRepository(Recruitment)
    private recruitment: Repository<Recruitment>,
  ) {}

  async addRecruitment(createRecruitmentDto: CreateRecruitmentDto) {
    const company = await this.company.findOne({
      where: {
        companyID: createRecruitmentDto.companyID,
      },
    });

    if (!company) {
      throw new NotFoundException(
        `Company with ID ${createRecruitmentDto.companyID} not found.`,
      );
    }
    const recruitment = Recruitment.from(createRecruitmentDto);

    await this.recruitment.save(recruitment);
    return {
      message: '정상적으로 채용 공고를 등록하였습니다.',
      data: recruitment,
    };
  }

  async setRecruitment(id: number, updateRecruitmentDto: UpdateRecruitmentDto) {
    const recruitment = await this.recruitment.findOne({
      where: {
        recruitID: id,
      },
    });

    if (!recruitment) {
      throw new NotFoundException(`Recruitment with ID ${id} not found.`);
    }

    if (!updateRecruitmentDto.position) {
      throw new BadRequestException(`Recruitment with Position is Null.`);
    } else if (!updateRecruitmentDto.reward) {
      throw new BadRequestException(`Recruitment with Reward is Null.`);
    } else if (!updateRecruitmentDto.contents) {
      throw new BadRequestException(`Recruitment with Contents is Null.`);
    } else if (!updateRecruitmentDto.skill) {
      throw new BadRequestException(`Recruitment with Skill is Null.`);
    }

    await this.recruitment
      .createQueryBuilder()
      .update()
      .set(updateRecruitmentDto)
      .where('recruitID = :id', {
        id: id,
      })
      .execute();

    return {
      message: '정상적으로 채용 공고를 수정하였습니다.',
      data: updateRecruitmentDto,
    };
  }
}
