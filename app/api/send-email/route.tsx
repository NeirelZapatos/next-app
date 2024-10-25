import { render } from '@react-email/components';
import nodemailer from 'nodemailer';
import WelcomeTemplate from '../../../emails/WelcomeTemplate';

export async function POST() {
    const transporter = nodemailer.createTransport({
        host: 'smtp.forwardemail.net',
        port: 465,
        secure: true,
        auth: {
          user: 'my_user',
          pass: 'my_password',
        },
      });
      
      const emailHtml = await render(<WelcomeTemplate name="Neirel" />);
      
      const options = {
        from: 'you@example.com',
        to: 'user@gmail.com',
        subject: 'hello world',
        html: emailHtml,
      };
      
      await transporter.sendMail(options);
}


