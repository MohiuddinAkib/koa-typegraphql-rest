import { Container } from 'typedi';

// Custom imports
import UserEvents from '@/events/UserEvents';
import * as userEvents from '@/constants/events/user';
import EmailService from '@/services/graphql/email/EmailService';
import { IEmailService } from '@/services/graphql/email/IEmailService';

const emailService: IEmailService = Container.get(EmailService);

export default () => {
  UserEvents.on(userEvents.USER_CREATED, emailService.sendConfirmationMail);
};
