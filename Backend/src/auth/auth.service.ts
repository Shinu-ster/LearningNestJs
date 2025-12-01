/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/models/role.entity';
import { RefreshToken } from 'src/models/refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>, // injecting typeorm
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  // 33. Creating register logic
  async register(dto: RegisterDto) {
    const exists = await this.usersRepo.findOne({
      where: { email: dto.email },
    });
    if (exists) throw new BadRequestException('Email already in use');
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.password = hashed;
    user.isActive = true;

    const savedUser = await this.usersRepo.save(user);

    const studentRole = await this.roleRepository.findOne({
      where: { name: 'student' },
    });
    if (studentRole) {
      savedUser.roles = [studentRole];
      await this.usersRepo.save(savedUser);
    }
    // const user = this.usersRepo.create({ email: dto.email, password: hashed });
    // return this.usersRepo.save(user); // Save user if user doesn't exists

    const { ...result } = savedUser;
    return result;
  }

  // validating user if user exists return user if not then null
  async validateUser(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) throw new UnauthorizedException('Invalid credientials');

    // Update last login
    await this.usersRepo.update(user.id, {
      lastLogin: new Date(),
    });

    // Generate tokens
    const payload = {
      email: user.email,
      sub: user.id,
      roles: user.roles?.map((role) => role.name) || [],
      permissions:
        user.roles?.flatMap(
          (role) =>
            role.permissions?.map((permission) => permission.name) || [],
        ) || [],
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = uuidv4();

    const refreshTokenEntity = new RefreshToken();
    refreshTokenEntity.token = refreshToken;
    refreshTokenEntity.userId = user.id;
    refreshTokenEntity.expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    ); /// 7 days
    await this.refreshTokenRepository.save(refreshTokenEntity);

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles || [],
      },
      accessToken,
      refreshToken,
    };

    // //42. adding roles in payload as well
    // const payload = { sub: user.id, email: user.email, roles: user.roles };
    // const token = this.jwtService.sign(payload);
    // // returning token + user info
    // const { password, ...rest } = user as any;
    // return { user: rest, access_token: token };
  }

  async findUserById(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }
}
