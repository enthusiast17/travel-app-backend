import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(user: User): Promise<User> {
    return this.prismaService.user.create({
      data: user,
    });
  }

  async findUserById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { username },
    });
  }

  async editUser(user: User): Promise<User> {
    return this.prismaService.user.update({
      where: { username: user.username },
      data: user,
    });
  }

  async deleteUser(user: User): Promise<User> {
    return this.prismaService.user.delete({
      where: { username: user.username },
    });
  }
}
