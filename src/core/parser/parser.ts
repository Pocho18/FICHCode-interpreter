import { PSEintParser } from './grammar.js';

// Crear instancia del parser
export const parser = new PSEintParser();

// Función para analizar el texto tokenizado
export function parse(tokens: any[]) {
  parser.input = tokens;
  const cst = parser.algoritmo();
  
  if (parser.errors.length > 0) {
    throw new Error(`Error sintáctico: ${parser.errors[0].message}`);
  }
  
  return cst;
}