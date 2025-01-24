import { SettingService } from '@hedhog/setting';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GatewayMercadoPagoService {
  private readonly baseUrl = 'https://api.mercadopago.com/v1';
  private accessToken: string;
  private setting: Record<string, string>;

  constructor(
    @Inject(forwardRef(() => SettingService))
    private readonly settingService: SettingService,
  ) { }

  async loadSetting() {
    this.setting = await this.settingService.getSettingValues([
      'payment-gateway',
      'payment-mercado-pago-access-token',
    ]);

    if (!this.setting['payment-gateway']) {
      throw new BadRequestException(
        `You must set the payment gateway in the setting.`,
      );
    }

    this.accessToken = this.setting['payment-mercado-pago-access-token'];
  }

  async createPayment(data: any): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/payments`, data, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        `Error creating payment: ${(error as any).response?.data?.message || (error as any).message}`,
      );
    }
  }

  async getPaymentStatus(paymentId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Error fetching payment status: ${(error as any).response?.data?.message || (error as any).message}`,
      );
    }
  }
}
