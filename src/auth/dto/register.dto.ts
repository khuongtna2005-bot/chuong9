import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, {
    message: 'Email không hợp lệ',
  })
  email: string;

  @IsString({
    message: 'Mật khẩu phải là chuỗi',
  })
  @IsNotEmpty({
    message: 'Mật khẩu không được để trống',
  })
  @MinLength(6, {
    message: 'Mật khẩu tối thiểu 6 ký tự',
  })
  password: string;

  @IsOptional()
  @IsString({
    message: 'Tên phải là chuỗi',
  })
  name?: string;
}