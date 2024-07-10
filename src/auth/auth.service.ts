import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, await bcrypt.genSalt());
    log(user);
    try {
      await user.save();
    } catch (error) {
      log(error.code);
      if (error.code === '23505') {
        throw new ConflictException('Username Already Exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validatorUserPassword(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    try {
      const user = await this.userRepo.findOne({ where: { username } });
      console.log(await user.validePassword(password));
      if (user && (await user.validePassword(password))) {
        const payload: JwtPayload = {
          username: user.username,
        };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
      } else {
        throw new UnauthorizedException('Invalide credential');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalide credential');
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
