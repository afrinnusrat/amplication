/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-empty-interface, @typescript-eslint/naming-convention */

import {
  Body,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";
import { MorganInterceptor } from "nest-morgan";
import {
  ACGuard,
  RolesBuilder,
  UseRoles,
  UserRoles,
} from "nest-access-control";
// @ts-ignore
// eslint-disable-next-line
import { BasicAuthGuard } from "../auth/basicAuth.guard";
// @ts-ignore
// eslint-disable-next-line
import { getInvalidAttributes } from "../auth/abac.util";

declare interface WHERE_UNIQUE_INPUT {}
declare interface RELATED_ENTITY_WHERE_UNIQUE_INPUT {}
declare interface RELATED_ENTITY_WHERE_INPUT {}
declare interface Select {}

declare interface RELATED_ENTITY {}

declare interface SERVICE {
  findOne(args: {
    where: WHERE_UNIQUE_INPUT;
  }): {
    PROPERTY(args: {
      where: RELATED_ENTITY_WHERE_INPUT;
      select: Select;
    }): Promise<RELATED_ENTITY[]>;
  };
  update(args: {
    where: WHERE_UNIQUE_INPUT;
    data: {
      PROPERTY: {
        set?: RELATED_ENTITY_WHERE_UNIQUE_INPUT[];
        connect?: RELATED_ENTITY_WHERE_UNIQUE_INPUT[];
        disconnect?: RELATED_ENTITY_WHERE_UNIQUE_INPUT[];
      };
    };
    select: { id: true };
  }): Promise<void>;
}

declare const ENTITY_NAME: string;
declare const RELATED_ENTITY_NAME: string;
declare const FIND_MANY_PATH: string;
declare const CREATE_PATH: string;
declare const DELETE_PATH: string;
declare const UPDATE_PATH: string;
declare const SELECT: Select;

export class Mixin {
  constructor(
    private readonly service: SERVICE,
    private readonly rolesBuilder: RolesBuilder
  ) {}

  @UseInterceptors(MorganInterceptor("combined"))
  @UseGuards(BasicAuthGuard, ACGuard)
  @Get(FIND_MANY_PATH)
  @UseRoles({
    resource: ENTITY_NAME,
    action: "read",
    possession: "any",
  })
  async FIND_MANY(
    @Param() params: WHERE_UNIQUE_INPUT,
    @Query() query: RELATED_ENTITY_WHERE_INPUT,
    @UserRoles() userRoles: string[]
  ): Promise<RELATED_ENTITY[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: RELATED_ENTITY_NAME,
    });
    const results = await this.service
      .findOne({ where: params })
      .PROPERTY({ where: query, select: SELECT });
    return results.map((result) => permission.filter(result));
  }

  @UseInterceptors(MorganInterceptor("combined"))
  @UseGuards(BasicAuthGuard, ACGuard)
  @Post(CREATE_PATH)
  @UseRoles({
    resource: ENTITY_NAME,
    action: "update",
    possession: "any",
  })
  async CREATE(
    @Param() params: WHERE_UNIQUE_INPUT,
    @Body() body: WHERE_UNIQUE_INPUT[],
    @UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      PROPERTY: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: ENTITY_NAME,
    });
    const invalidAttributes = getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new ForbiddenException(
        `Updating the relationship: ${invalidAttributes[0]} of ${ENTITY_NAME} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @UseInterceptors(MorganInterceptor("combined"))
  @UseGuards(BasicAuthGuard, ACGuard)
  @Patch(UPDATE_PATH)
  @UseRoles({
    resource: ENTITY_NAME,
    action: "update",
    possession: "any",
  })
  async UPDATE(
    @Param() params: WHERE_UNIQUE_INPUT,
    @Body() body: WHERE_UNIQUE_INPUT[],
    @UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      PROPERTY: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: ENTITY_NAME,
    });
    const invalidAttributes = getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new ForbiddenException(
        `Updating the relationship: ${invalidAttributes[0]} of ${ENTITY_NAME} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @UseInterceptors(MorganInterceptor("combined"))
  @UseGuards(BasicAuthGuard, ACGuard)
  @Delete(DELETE_PATH)
  @UseRoles({
    resource: ENTITY_NAME,
    action: "update",
    possession: "any",
  })
  async DELETE(
    @Param() params: WHERE_UNIQUE_INPUT,
    @Body() body: WHERE_UNIQUE_INPUT[],
    @UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      PROPERTY: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: ENTITY_NAME,
    });
    const invalidAttributes = getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new ForbiddenException(
        `Updating the relationship: ${invalidAttributes[0]} of ${ENTITY_NAME} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
