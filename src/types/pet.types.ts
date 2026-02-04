export interface Pet {
  id?: string;
  nome: string;
  especie: 'Cão' | 'Gato' | 'Outro';
  raca: string;
  emoji?: string;
  foto?: string;
  email?: string;
}

export interface Tutor {
  tutor: string;
  email: string;
  cpf: string;
  telefone: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento?: string;
  estado: string;
  cidade: string;
  foto?: string;
}
