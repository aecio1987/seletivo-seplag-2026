export interface Estado {
  sigla: string;
  nome: string;
}

export const LocationService = {
  async getEstados(): Promise<Estado[]> {
    const res = await fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
    );
    const data = await res.json();
    return data.map((e: any) => ({ sigla: e.sigla, nome: e.nome }));
  },

  async getCidades(uf: string): Promise<string[]> {
    const res = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`
    );
    const data = await res.json();
    return data.map((c: any) => c.nome);
  }
};
