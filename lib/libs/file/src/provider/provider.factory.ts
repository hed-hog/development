import { AbstractProvider } from './abstract,provider';
import { AzureProvider } from './azure.provider';
import { LocalProvider } from './local.provider';
import { EnumProvider } from './provider.enum';
import { S3Provider } from './s3.provider';

export class ProviderFactory {
  static create(
    providerType: EnumProvider,
    settings: Record<string, string>,
  ): AbstractProvider {
    console.log('providerType', providerType);
    switch (providerType) {
      case EnumProvider.S3:
        return new S3Provider(settings);
      case EnumProvider.LOCAL:
        return new LocalProvider(settings);
      case EnumProvider.AZURE:
        return new AzureProvider(settings);
    }
  }
}
