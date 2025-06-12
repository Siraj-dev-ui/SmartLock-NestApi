export class RegisterUserDto {
  name: string;
  email: string;
  password: string;
  role_applied: string; //supervisor,user
  request_status: string; //pending,approved,rejected
}
