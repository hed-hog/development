"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoProvider = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const abstract_provider_1 = require("./abstract.provider");
class MercadoPagoProvider extends abstract_provider_1.AbstractProvider {
    constructor(id, setting, httpService) {
        super(id);
        this.setting = setting;
        this.httpService = httpService;
        this.baseUrl = 'https://api.mercadopago.com';
    }
    async createPaymentIntent() {
        const data = {
            token: '',
            installments: 1,
            transaction_amount: 0,
            description: '',
            payment_method_id: 1,
            issuer_id: '',
            external_reference: '',
            additional_info: {
                items: [],
                payer: '',
            },
            payer: {
                email: '',
                identification: {
                    number: '',
                    type: 'CPF',
                },
            },
            notification_url: '',
        };
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.request({
            url: `${this.baseUrl}/v1/payments`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.setting['payment-mercado-pago-token']}`,
            },
            data,
        }));
        return { setting: this.setting, response: response.data };
    }
    async createSubscription(cardToken, planId, email, total, reference, reason) {
        const data = {
            preapproval_plan_id: planId,
            card_token_id: cardToken,
            payer_email: email,
            transaction_amount: Number(total),
            external_reference: reference,
            reason,
            status: 'authorized',
        };
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.request({
            url: `https://api.mercadopago.com/preapproval`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.setting['payment-mercado-pago-token']}`,
            },
            data,
        }));
        return {
            cardToken,
            planId,
            email,
            total,
            reference,
            reason,
            setting: this.setting,
            response: response.data,
        };
    }
    async getPaymentMethods() {
        if (!this.setting['payment-mercado-pago-token']) {
            throw new common_1.BadRequestException(`You must set the storage provider in the setting.`);
        }
        const { data } = await (0, rxjs_1.lastValueFrom)(this.httpService.request({
            url: `${this.baseUrl}/v1/payment_methods`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.setting['payment-mercado-pago-token']}`,
            },
        }));
        return data;
    }
}
exports.MercadoPagoProvider = MercadoPagoProvider;
//# sourceMappingURL=mercado-pago.provider.js.map