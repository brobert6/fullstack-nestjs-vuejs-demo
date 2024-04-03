import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Assign roles to the user
    const roleNames = createUserDto.roles.map((roleDto) => roleDto.name);
    const roles = await this.findOrCreateRoles(roleNames);

    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const user = new User({
      ...createUserDto,
      roles,
    });
    const userReturned = await this.entityManager.save(user);
    delete userReturned.password;
    return user;
  }

  private async findOrCreateRoles(roleNames: string[]): Promise<Role[]> {
    const roles: Role[] = [];
    for (const roleName of roleNames) {
      let role = await this.entityManager.findOne(Role, { where: { name: roleName } });
      if (!role) {
        role = new Role({ name: roleName });
        await this.entityManager.save(role);
      }
      roles.push(role);
    }
    return roles;
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id },
      relations: { roles: true },
    });
  }

  async findOneByLogin(data: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: data.email },
    });
    if (!user) {
      throw new UnauthorizedException('Could not find user!');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let userReturned: User;
    await this.entityManager.transaction(async (entityManager) => {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException();
      }

      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);

      Object.assign(user, updateUserDto);

      // Update user roles
      if (updateUserDto.roles !== undefined) {
        const roleNames = updateUserDto.roles.map((roleDto) => roleDto.name);
        user.roles = await this.findOrCreateRoles(roleNames);
      }

      userReturned = await entityManager.save(user);
      delete userReturned.password;
    });
    return userReturned;
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
