export interface Subscription {
  id: number;
  type: number;
  startDate: string; 
  endDate: string; 
  active: boolean;
  paymentMethodId: number;
}
