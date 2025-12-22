export type CashRegisterStatus = 'open' | 'closed';

export interface CashRegister {
  id: number;
  name: string;
  status: CashRegisterStatus;
  currentValue: number;
  lastOpening: Date | null;
  lastClosure: Date | null;
  user: string;
}
