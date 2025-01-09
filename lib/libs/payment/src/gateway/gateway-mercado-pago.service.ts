import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class GatewayMercadoPagoService {
  private readonly baseUrl = 'https://api.mercadopago.com/v1';
  private readonly accessToken: string;

  constructor(private readonly configService: ConfigService) {
    this.accessToken = this.configService.get<string>(
      'MERCADO_PAGO_ACCESS_TOKEN',
    );
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
        `Error creating payment: ${error.response?.data?.message || error.message}`,
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
        `Error fetching payment status: ${error.response?.data?.message || error.message}`,
      );
    }
  }
}
