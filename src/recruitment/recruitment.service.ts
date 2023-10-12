import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Applications, Recruitment } from './recruitment.entity';
import { Company } from '~/company/company.entity';

import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { CreateApplicationDto } from '~/recruitment/dto/create-application.dto';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectRepository(Company)
    private company: Repository<Company>,
    @InjectRepository(Recruitment)
    private recruitment: Repository<Recruitment>,
    @InjectRepository(Applications)
    private applications: Repository<Applications>,
  ) {}

  async getRecruitment(id: number) {
    console.log(id);
    const recruitments = await this.recruitment
      .createQueryBuilder('r')
      .select('r.recruitID', 'recruitID')
      .addSelect('r.position', 'position')
      .addSelect('r.reward', 'reward')
      .addSelect('r.skill', 'skill')
      .addSelect('r.content', 'content')
      .addSelect('c.companyID', 'companyID')
      .addSelect('c.companyName', 'companyName')
      .addSelect('c.country', 'country')
      .addSelect('c.region', 'region')
      .innerJoin('r.company', 'c')
      .where('r.recruitID = :id', {
        id: id,
      })
      .getRawOne();

    const otherRecruitment = await this.recruitment
      .createQueryBuilder('r')
      .select('r.recruitID', 'recruitID')
      .where('r.companyID = :id', {
        id: recruitments.companyID,
      })
      .getRawMany()
      .then((result) => result.map((data) => data.recruitID));

    return {
      message: '채용공고를 검색하였습니다.',
      data: {
        ...recruitments,
        otherRecruitment: otherRecruitment,
      },
    };
  }

  async getRecruitments({ search, page, rows, sort }) {
    return {
      message: '채용공고를 검색하였습니다.',
      data: await this.recruitment
        .createQueryBuilder('r')
        .select('r.recruitID', 'recruitID')
        .addSelect('r.position', 'position')
        .addSelect('r.reward', 'reward')
        .addSelect('r.skill', 'skill')
        .addSelect('c.companyID', 'companyID')
        .addSelect('c.companyName', 'companyName')
        .addSelect('c.country', 'country')
        .addSelect('c.region', 'region')
        .innerJoin('r.company', 'c')
        .where('r.position LIKE :search', {
          search: `%${search}%`,
        })
        .orWhere('r.content LIKE :search', {
          search: `%${search}%`,
        })
        .orWhere('r.skill LIKE :search', {
          search: `%${search}%`,
        })
        .orderBy('r.recruitID', `${sort === 'ASC' ? 'ASC' : 'DESC'}`)
        .limit(rows)
        .offset((page - 1) * rows)
        .getRawMany(),
    };
  }

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

  async addApplication(id: number, { userID }) {
    const exist = await this.applications.findOne({
      where: {
        recruitID: id,
        userID: userID,
      },
    });

    if (exist) {
      throw new BadRequestException(`이미 ${userID}가 지원한 채용공고입니다.`);
    }
    const application: CreateApplicationDto = {
      recruitID: id,
      userID: userID,
    };

    await this.applications.save(application);
    return {
      message: `${id}번 채용공고에 지원하였습니다.`,
      data: application,
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
      throw new BadRequestException('채용공고의 position 내용이 비어있습니다.');
    } else if (!updateRecruitmentDto.reward) {
      throw new BadRequestException('채용공고의 reward 내용이 비어있습니다.');
    } else if (!updateRecruitmentDto.content) {
      throw new BadRequestException('채용공고의 content 내용이 비어있습니다.');
    } else if (!updateRecruitmentDto.skill) {
      throw new BadRequestException('채용공고의 skill 내용이 비어있습니다.');
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
