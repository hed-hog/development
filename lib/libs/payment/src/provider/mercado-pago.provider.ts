import axios, { AxiosInstance } from 'axios';
import { AbstractProvider } from './abstract.provider';

export class MercadoPagoProvider extends AbstractProvider {
  private apiUrl: string;
  private accessToken: string;
  private httpClient: AxiosInstance;

  constructor(private setting: Record<string, string>) {
    super();
    this.apiUrl = 'https://api.mercadopago.com/v1';
    this.accessToken = this.setting['payment-mercado-pago-token'];
    this.httpClient = axios.create({
      baseURL: this.apiUrl,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async createPayment(data: any): Promise<any> {
    try {
      const response = await this.httpClient.post('/payments', data);
      return response.data;
    } catch (error) {
      throw new Error(`Error creating payment: ${error.message}`);
    }
  }

  async getPayment(paymentId: string): Promise<any> {
    try {
      const response = await this.httpClient.get(`/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error retrieving payment: ${error.message}`);
    }
  }
}
