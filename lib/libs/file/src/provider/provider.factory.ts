import { AbstractProvider } from './abstract,provider';
import { AzureProvider } from './azure.provider';
import { LocalProvider } from './local.provider';
import { EnumProvider } from './provider.enum';
import { S3Provider } from './s3.provider';

export class ProviderFactory {
  static create(
    providerType: EnumProvider,
    setting: Record<string, string>,
  ): AbstractProvider {
    switch (providerType) {
      case EnumProvider.S3:
        return new S3Provider(setting);
      case EnumProvider.LOCAL:
        return new LocalProvider(setting);
      case EnumProvider.AZURE:
        return new AzureProvider(setting);
    }
  }
}
