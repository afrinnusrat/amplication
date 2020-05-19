import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { AccountModule } from '../account/account.module';
import { PrismaModule } from '../../services/prisma.module';
import { UserModule } from '../user/user.module';
import { OrganizationModule } from '../organization/organization.module';
import { PermissionsModule } from '../permissions/permissions.module';

import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET')
      }),
      inject: [ConfigService]
    }),
    AccountModule, // (AccountService, PasswordService)
    PrismaModule, // (PrismaService)
    PermissionsModule,
    OrganizationModule,
    UserModule
  ],
  providers: [AuthService, JwtStrategy, GqlAuthGuard],
  exports: [GqlAuthGuard, AuthService]
})
export class AuthModule {}