interface IProvider {
  createPayment: (data: any) => Promise<any>;
  getPayment: (paymentId: string) => Promise<any>;
}

export abstract class AbstractProvider implements IProvider {
  abstract createPayment(data: any): Promise<any>;
  abstract getPayment(paymentId: string): Promise<any>;
}
