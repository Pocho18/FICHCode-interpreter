export type PSEintDataType = 'Entero' | 'Real' | 'Caracter' | 'Logico';

export interface Variable {
  name: string;
  type: PSEintDataType;
  value: any;
}

export type VisitorMap = Record<string, (ctx: any) => any>;