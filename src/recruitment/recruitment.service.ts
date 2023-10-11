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
        `회사 ID ${createRecruitmentDto.companyID}번이 존재하지 않습니다.`,
      );
    }
    const recruitment = Recruitment.from(createRecruitmentDto);

    await this.recruitment.save(recruitment);
    return {
      message: '채용공고를 등록하였습니다.',
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
      throw new BadRequestException(`채용공고의 position 내용이 비어있습니다.`);
    } else if (!updateRecruitmentDto.reward) {
      throw new BadRequestException(`채용공고의 reward 내용이 비어있습니다.`);
    } else if (!updateRecruitmentDto.content) {
      throw new BadRequestException(`채용공고의 content 내용이 비어있습니다.`);
    } else if (!updateRecruitmentDto.skill) {
      throw new BadRequestException(`채용공고의 skill 내용이 비어있습니다.`);
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
      message: `채용공고 ${id}번을 수정하였습니다.`,
      data: updateRecruitmentDto,
    };
  }

  async removeRecruitment(id: number) {
    const data = await this.recruitment.delete({
      recruitID: id,
    });

    if (data.affected) {
      return {
        message: `채용공고 ${id}번을 삭제하였습니다.`,
      };
    } else {
      throw new NotFoundException(`채용공고 ${id}번이 존재하지 않습니다.`);
    }
  }
}
