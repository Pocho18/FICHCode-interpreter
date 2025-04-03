import { Lexer } from "chevrotain";
import { allTokens } from "./tokens.js";

// Crear e instanciar el lexer
export const PSEintLexer = new Lexer(allTokens);

// Función auxiliar para tokenizar el código
export function tokenize(text: string) {
  const lexResult = PSEintLexer.tokenize(text);
  
  if (lexResult.errors.length > 0) {
    throw new Error(`Error léxico: ${lexResult.errors[0].message}`);
  }
  
  return lexResult.tokens;
}