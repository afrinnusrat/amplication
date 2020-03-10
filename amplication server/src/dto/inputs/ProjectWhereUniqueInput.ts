import { Arg, ArgsType, Field, FieldResolver, Float, ID, InputType, Int, ObjectType, registerEnumType } from "type-graphql";
import { Args, Context, Mutation, Query, ResolveProperty, Resolver, Root } from "@nestjs/graphql";

@InputType(
  {  isAbstract: true,
  description: undefined  
})
export class ProjectWhereUniqueInput {
  @Field(_type => String, {
    nullable: true,
    description: undefined
  })
  id?: string | null;
}
