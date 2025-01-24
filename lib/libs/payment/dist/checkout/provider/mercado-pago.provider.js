"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoProvider = void 0;
const abstract_provider_1 = require("./abstract,provider");
class MercadoPagoProvider extends abstract_provider_1.AbstractProvider {
    constructor(setting) {
        super();
        this.setting = setting;
    }
    async createPaymentIntent(amount, currency) {
        return { amount, currency, setting: this.setting };
    }
    async createSubscription(priceId, customerId) {
        return { priceId, customerId, setting: this.setting };
    }
}
exports.MercadoPagoProvider = MercadoPagoProvider;
//# sourceMappingURL=mercado-pago.provider.js.map