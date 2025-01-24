import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class GatewayStripeService {
  private readonly baseUrl = 'https://api.stripe.com/v1';
  private readonly secretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
  }

  async createPayment(data: any): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/payment_intents`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Error creating payment: ${(error as any).response?.data?.error?.message || (error as any).message}`,
      );
    }
  }

  async getPaymentStatus(paymentId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/payment_intents/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Error fetching payment status: ${(error as any).response?.data?.error?.message || (error as any).message}`,
      );
    }
  }
}
