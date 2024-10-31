# <p align="center">hedhog/mail</p>

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/177489127?s=200&v=4" alt="Hedhog Avatar" />
</p>

**HedHog Mail** is an email sending library that is part of the HedHog framework. This library provides support for sending emails using various email services such as AWS SES, Gmail, and SMTP. It is configured to handle multiple types of email sending, including emails with attachments and multi-part content.

## Features

- **Send Emails via AWS SES**: Send emails using Amazon Simple Email Service.
- **Send Emails via Gmail**: Send emails using the Gmail API.
- **Send Emails via SMTP**: Send emails through an SMTP server.
- **Create Emails with Attachments**: Support for emails with multiple attachments and formatted content.

## Installation

This library is an integral part of the HedHog framework and should be installed as a dependency in your HedHog project. Ensure that the necessary dependencies are configured in your HedHog project.

```bash
npm i @hedhog/mail
```

## Usage

The `MailService` is the main class responsible for sending emails. Here is a basic example of how to use the email service:

### Configuration and Sending Emails

```typescript
import { MailService } from '@hedhog/mail';
import { Mail } from '@hedhog/mail/interfaces/mail.interface';

// Assuming you have properly configured MailService in your module

const mailService = new MailService(/* configuration options */);

const mail: Mail = {
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Test Email',
  body: '<h1>Hello World!</h1>',
  attachments: [
    {
      filename: 'attachment.txt',
      content: Buffer.from('Hello, this is an attachment!'),
      contentType: 'text/plain',
    },
  ],
};

mailService
  .send(mail)
  .then((response) => {
    console.log('Email sent successfully:', response);
  })
  .catch((error) => {
    console.error('Error sending email:', error);
  });
```

## Available Methods

- **send(mail: Mail)**: Sends an email based on the specified configuration (AWS, GMAIL, or SMTP).
- **createRawEmail(mail: Mail)**: Creates a raw representation of the email for sending.

## Folder Structure

```plaintext
mail/
├── dist/                        # Compiled JavaScript file from build
├── node_modules/                # Discardable folder with all module dependencies
├── src/
│   ├── mail.service.ts           # Email sending service
│   ├── mail.module.ts            # Module for MailService
│   └── mail.consts.ts            # Constants related to email sending
│   ├── mail.service.spec.ts      # Unit tests for MailService
│   └── mail.template.ejs         # Email templates in EJS format
│   ├── index.ts                  # Entry point for mail file
│   ├── interfaces/
│   │   └── mail-module-options.interface.ts # Interface for configuration options
│   ├── enums/
│   │   └── mail-configuration-type.enum.ts # Enum for email configuration types
├── .gitignore                     # Specifies which file Git should ignore
├── package.json                   # Manages dependencies and scripts for the library
├── package-lock.json              # Lock file for dependencies
├── README.md                      # Documentation for the library
└── tsconfig.lib.json              # TypeScript configuration for the library
└── tsconfig.production.json       # TypeScript configuration for production builds
```
