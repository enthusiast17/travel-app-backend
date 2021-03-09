import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const deleteUnwantedProps = (obj: User) => {
    delete obj.id;
    delete obj.avatar;
  };

  const testUser = { username: 'test', password: 'hello' };
  let createdTestUser;

  it('create user', async () => {
    const createdUser = await service.createUser(testUser);
    createdTestUser = { ...createdUser };
    deleteUnwantedProps(createdUser);
    expect(createdUser).toStrictEqual(testUser);
  });

  it('find user by username', async () => {
    const foundUserByUsername = await service.findUserByUsername(
      testUser.username,
    );
    expect(foundUserByUsername).toStrictEqual(createdTestUser);
  });

  it('find user by username', async () => {
    const foundUserByUsername = await service.findUserByUsername(
      'invalid user',
    );
    expect(foundUserByUsername).toBeNull();
  });

  it('find user by id', async () => {
    const foundUserById = await service.findUserById(createdTestUser.id);
    expect(foundUserById).toStrictEqual(createdTestUser);
  });

  it('find user by id', async () => {
    const foundUserById = await service.findUserById('invalid id');
    expect(foundUserById).toBeNull();
  });

  it('delete user', async () => {
    const deletedUser = await service.deleteUser(testUser);
    expect(deletedUser).toStrictEqual(createdTestUser);
    createdTestUser = null;
  });
});
