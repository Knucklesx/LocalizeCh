export interface ClientInterface {
  id: number;
  nome: string;
  telefone: string;
  endereço: string;
  documento: string;
  usuárioId: number;
  charges: Charges[];
  pagos: number;
  abertos: number;
  atrasados: number;
}

export interface Charges {
  id: number;
  description: string;
  value: number;
  data_Vencimento: string;
  pago: boolean;
  clienteId: number;
}
