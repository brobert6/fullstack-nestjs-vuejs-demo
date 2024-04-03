import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './entities/agent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentsRepository: Repository<Agent>
  ) {}

  async create(createAgentDto: CreateAgentDto) {
    const city = this.agentsRepository.create(createAgentDto);
    return await this.agentsRepository.save(city);
  }

  async findAll() {
    return this.agentsRepository.find();
  }

  async findOne(id: number) {
    const agent = await this.agentsRepository.findOne({
      where: {
        id: id,
      },
      relations: { user: true },
    });
    if (!agent) {
      throw new NotFoundException();
    }
    return agent;
  }

  findAgent(userId: number): Promise<Agent> {
    return this.agentsRepository.findOneBy({ user: { id: userId } });
  }

  async update(id: number, updateAgentDto: UpdateAgentDto) {
    const agent = await this.findOne(id);
    if (!agent) {
      throw new NotFoundException();
    }

    Object.assign(agent, updateAgentDto);

    return await this.agentsRepository.save(agent);
  }

  async remove(id: number) {
    const agent = await this.findOne(id);
    if (!agent) {
      throw new NotFoundException();
    }

    return await this.agentsRepository.remove(agent);
  }
}
