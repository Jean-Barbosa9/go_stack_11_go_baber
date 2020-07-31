import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsTemplateProvider from './MailTemplateProvider/implementations/HandlebarsTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  process.env.APP_MAIL_DRIVER === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider),
);
