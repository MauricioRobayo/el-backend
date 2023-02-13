import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from 'class-validator-password-check';

const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainUpperLetter: true,
  mustContainSpecialCharacter: true,
  mustContainNumber: true,
};

export class AuthRegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @Validate(PasswordValidation, [passwordRequirement])
  readonly password: string;
}
