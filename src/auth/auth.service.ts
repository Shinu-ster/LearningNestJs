/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>, // injecting typeorm
    private jwtService: JwtService,
  ) {}

  // 33. Creating register logic
  async register(dto: RegisterDto) {
    const exists = await this.usersRepo.findOne({
      where: { email: dto.email },
    });
    if (exists) throw new BadRequestException('Email already in use');
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({ email: dto.email, password: hashed });
    return this.usersRepo.save(user); // Save user if user doesn't exists
  }

  // validating user if user exists return user if not then null
  async validateUser(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credientials');
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    // returning token + user info
    const { password, ...rest } = user as any;
    return { user: rest, access_token: token };
  }

  async findUserById(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }
}
