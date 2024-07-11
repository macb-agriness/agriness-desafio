import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { Injectable } from "@nestjs/common";
import { LoteService } from "../lote.service";

@Injectable()
@ValidatorConstraint( { async: true })
export class UniqueValidator implements ValidatorConstraintInterface {

  constructor(private loteService: LoteService) {}

  async validate(key: any, validationArguments?: ValidationArguments): Promise<boolean> {
    return !await this.loteService.exists(key);//se chave não existir
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return "O id já existe na base de dados e não pode ser cadastrado"
  }
}

export const Unique = (options: ValidationOptions) => {
  return (object: Object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: options,
      constraints: [],
      validator: UniqueValidator
    });
  }
}