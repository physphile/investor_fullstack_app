import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategyf } from 'src/common/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/common/strategies/refreshToken.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategyf, RefreshTokenStrategy],
})
export class AuthModule {}