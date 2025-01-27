"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeProvider = void 0;
const abstract_provider_1 = require("./abstract,provider");
class StripeProvider extends abstract_provider_1.AbstractProvider {
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
exports.StripeProvider = StripeProvider;
//# sourceMappingURL=stripe.provider.js.map