"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderFactory = void 0;
const mercado_pago_provider_1 = require("./mercado-pago.provider");
const provider_enum_1 = require("./provider.enum");
class ProviderFactory {
    static create(providerType, setting, httpService) {
        switch (providerType) {
            case provider_enum_1.EnumProvider.MERCADO_PAGO:
                return new mercado_pago_provider_1.MercadoPagoProvider(setting, httpService);
            default:
                throw new Error(`Provider ${providerType} not found.`);
        }
    }
}
exports.ProviderFactory = ProviderFactory;
//# sourceMappingURL=provider.factory.js.map