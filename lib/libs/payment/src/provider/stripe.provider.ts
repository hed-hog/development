import axios, { AxiosInstance } from 'axios';
import { AbstractProvider } from './abstract.provider';

export class StripeProvider extends AbstractProvider {
  private readonly apiUrl = 'https://api.stripe.com/v1/payment_intents';
  private readonly axiosInstance: AxiosInstance;

  constructor(private setting: Record<string, string>) {
    super();
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        Authorization: `Bearer ${this.setting['payment-stripe-secret-key']}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  async createPayment(data: any): Promise<any> {
    try {
      const response = await this.axiosInstance.post('', data);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to create payment: ${error.message}`);
    }
  }

  async getPayment(paymentId: string): Promise<any> {
    try {
      const response = await this.axiosInstance.get(`/${paymentId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to retrieve payment: ${error.message}`);
    }
  }
}
