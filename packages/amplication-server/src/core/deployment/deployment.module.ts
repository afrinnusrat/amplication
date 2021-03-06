import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { DockerModule } from '../docker/docker.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { BackgroundModule } from '../background/background.module';
import { ActionModule } from '../action/action.module';
import { DeployerRootModule } from '../deployer/deployerRoot.module';
import { DeploymentService } from './deployment.service';
import { DeploymentResolver } from './deployment.resolver';
import { DeploymentController } from './deployment.controller';
import { UserModule } from '../user/user.module';
import { EnvironmentModule } from '../environment/environment.module';

@Module({
  imports: [
    PrismaModule,
    DockerModule,
    DeployerRootModule,
    PermissionsModule,
    ActionModule,
    BackgroundModule,
    UserModule,
    EnvironmentModule
  ],
  providers: [DeploymentService, DeploymentResolver],
  exports: [DeploymentService, DeploymentResolver],
  controllers: [DeploymentController]
})
export class DeploymentModule {}
