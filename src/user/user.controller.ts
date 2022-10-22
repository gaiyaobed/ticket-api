import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { GetUser } from './custom-decorators/user-auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  async signUp(@Body() signUpDto: SignUpDto): Promise<any> {
    return await this.userService.signUp(signUpDto);
  }

  /*
   * Signin
   * */
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signIn(@Body() signInDto: SignUpDto): Promise<any> {
    return await this.userService.signIn(signInDto);
  }

  @Get('/')
  async findAll(): Promise<any> {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.userService.findOne(id);
  }

  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.userService.remove(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Put('/change-password')
  @UseGuards(AuthGuard('user'))
  @UsePipes(ValidationPipe)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: User,
  ): Promise<any> {
    return await this.userService.changePassword(changePasswordDto, user);
  }
}
