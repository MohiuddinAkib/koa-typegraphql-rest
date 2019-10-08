import { Service } from 'typedi';

// Custom imports
import { User } from '@/entity/User';
import { sendMail } from '@/utils/useSendMail';
import { IEmailService } from './IEmailService';
import {
  createConfirmationUrl,
  createForgotPasswordUrl
} from '@/utils/useCreateUrl';

@Service()
export default class EmailService implements IEmailService {
  async sendConfirmationMail(user: User): Promise<any> {
    const url = await createConfirmationUrl(user.id);
    await sendMail(user.email, url);
  }

  async sendForgotPasswordMail(user: User) {
    const url = await createForgotPasswordUrl(user.id);
    await sendMail(user.email, url);
  }
}
