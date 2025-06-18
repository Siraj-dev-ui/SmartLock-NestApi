export class RegisterUserDto {
  name: string;
  email: string;
  password: string;
  requested_role: string; //supervisor,user
  request_status: string; //pending,approved,rejected
  mobile_id: string;
  current_presence: boolean;
}
