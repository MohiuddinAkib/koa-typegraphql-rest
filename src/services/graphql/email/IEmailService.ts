// Custom imports
import { User } from '@/entity/User';

export interface IEmailService {
  sendConfirmationMail(user: User): Promise<any>;

  sendForgotPasswordMail(user: User): Promise<any>;
}
