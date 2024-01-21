import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Expense } from './entities/expense.entity';

@ApiTags('Expense')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) { }

  @Get()
  async findAll(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Expense> {
    return this.expenseService.findOne(id);
  }

  @ApiBody({
    type: CreateExpenseDto,
    description: 'The Expense to create',
  })
  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
    console.log('createExpenseDto', createExpenseDto);

    return this.expenseService.create(createExpenseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Expense> {
    return this.expenseService.remove(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    return this.expenseService.update(id, updateExpenseDto);
  }
}
