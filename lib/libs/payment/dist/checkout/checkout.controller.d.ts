import { CheckoutService } from './checkout.service';
import { CreateDTO } from './dto/create.dto';
export declare class CheckoutController {
    private readonly checkoutService;
    constructor(checkoutService: CheckoutService);
    create({ amount, currency }: CreateDTO): Promise<any>;
    createSubscription({ priceId, customerId }: any): Promise<any>;
}
//# sourceMappingURL=checkout.controller.d.ts.map