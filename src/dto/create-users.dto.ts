export class CreateUsersDto {
    readonly id: string;
    readonly name: string;
    readonly nick_name: string;
    readonly email_id: string;
    readonly mobile: string;
    readonly password: string;
    readonly is_active: boolean;
    readonly roles: any;
  }