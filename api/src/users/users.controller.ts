import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieve all users.' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retrieve one user.' })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ApiBody({
    type: User,
    description: 'The user to create',
  })
  @Post()
  // @ApiResponse({ status: 201, description: 'Create a new user.' })
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete a user.' })
  async delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update a user.' })
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.usersService.update(id, user);
  }
}
