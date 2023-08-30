import { SENDGRID_CONFIG, SendGridConfig } from '@app/app.config';
import { EmailTemplate } from '@app/communication/email_templates.enum';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private readonly sendGridConfig: SendGridConfig;

  constructor(configService: ConfigService) {
    this.sendGridConfig = configService.get<SendGridConfig>(SENDGRID_CONFIG);
    sgMail.setApiKey(this.sendGridConfig.apiKey);
  }

  async sendEmailAsync(
    to: string,
    templateName: EmailTemplate,
    dynamicTemplateData?: { [key: string]: any },
  ): Promise<void> {
    const msg = {
      to: to,
      from: this.sendGridConfig.senderEmail,
      templateId: this.getTemplateIdByName(templateName),
      dynamicTemplateData: dynamicTemplateData,
    };
    try {
      await sgMail.send(msg);
    } catch (e) {
      throw new Error(`Could not send email: ${e}`);
    }
  }

  getTemplateIdByName(templateName: EmailTemplate): string {
    const templateId = this.sendGridConfig.templates[templateName];

    if (!templateId) {
      throw `Invalid email template ${templateName}`;
    }
    return templateId;
  }
}
