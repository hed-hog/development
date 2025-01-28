import { HttpService } from '@nestjs/axios';
import { AbstractProvider } from './abstract.provider';
import { MercadoPagoProvider } from './mercado-pago.provider';
import { EnumProvider } from './provider.enum';

export class ProviderFactory {
  static create(
    providerType: EnumProvider,
    prividerId: number,
    setting: Record<string, string>,
    httpService: HttpService,
  ): AbstractProvider {
    switch (providerType) {
      case EnumProvider.MERCADO_PAGO:
        return new MercadoPagoProvider(prividerId, setting, httpService);
      default:
        throw new Error(`Provider ${providerType} not found.`);
    }
  }
}
