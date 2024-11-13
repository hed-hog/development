import { AbstractProvider } from './abstract.provider';
import { MercadoPagoProvider } from './mercado-pago.provider';
import { EnumProvider } from './provider.enum';
import { StripeProvider } from './stripe.provider';

export class ProviderFactory {
  static create(
    providerType: EnumProvider,
    setting: Record<string, string>,
  ): AbstractProvider {
    switch (providerType) {
      case EnumProvider.MERCADO_PAGO:
        return new MercadoPagoProvider(setting);
      case EnumProvider.STRIPE:
        return new StripeProvider(setting);
    }
  }
}
