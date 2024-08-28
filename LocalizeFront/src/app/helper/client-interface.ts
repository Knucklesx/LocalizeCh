export interface ClientInterface {
  id: number;
  nome: string;
  telefone: string;
  endereço: string;
  documento: string;
  usuárioId: number;
  cobranças: Cobrança[];
  pagos: number;
  abertos: number;
  atrasados: number;
}

export interface Cobrança {
  id: number;
  descrição: string;
  valor: number;
  data: string;
  pago: boolean;
  clienteId: number;
}
