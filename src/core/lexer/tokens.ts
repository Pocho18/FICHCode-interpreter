import { createToken, Lexer } from "chevrotain";

// Definición de tokens
export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED
});

export const Comment = createToken({
  name: "Comment",
  pattern: /\/\//,
  group: Lexer.SKIPPED
});

export const Numero = createToken({
  name: "Numero",
  pattern: /-?\d+(\.\d+)?/
});

export const Cadena = createToken({
  name: "Cadena",
  pattern: /"[^"]*"/
});

export const Identificador = createToken({
  name: "Identificador",
  pattern: /[a-zA-Z_][a-zA-Z0-9_]*/
});

export const Algoritmo = createToken({
  name: "Algoritmo",
  pattern: /Algoritmo/i,
  longer_alt: Identificador
});

export const FinAlgoritmo = createToken({
  name: "FinAlgoritmo",
  pattern: /FinAlgoritmo/i,
  longer_alt: Identificador
});

export const Definir = createToken({
  name: "Definir",
  pattern: /Definir/i,
  longer_alt: Identificador
});

export const Como = createToken({
  name: "Como",
  pattern: /Como/i,
  longer_alt: Identificador
});

export const Leer = createToken({
  name: "Leer",
  pattern: /Leer/i,
  longer_alt: Identificador
});

export const Escribir = createToken({
  name: "Escribir",
  pattern: /Escribir/i,
  longer_alt: Identificador
});

export const Si = createToken({
  name: "Si",
  pattern: /Si/i,
  longer_alt: Identificador
});

export const Entonces = createToken({
  name: "Entonces",
  pattern: /Entonces/i,
  longer_alt: Identificador
});

export const SiNo = createToken({
  name: "SiNo",
  pattern: /SiNo/i,
  longer_alt: Identificador
});

export const FinSi = createToken({
  name: "FinSi",
  pattern: /FinSi/i,
  longer_alt: Identificador
});

export const Para = createToken({
  name: "Para",
  pattern: /Para/i,
  longer_alt: Identificador
});

export const Hasta = createToken({
  name: "Hasta",
  pattern: /Hasta/i,
  longer_alt: Identificador
});

export const Con = createToken({
  name: "Con",
  pattern: /Con/i,
  longer_alt: Identificador
});

export const Paso = createToken({
  name: "Paso",
  pattern: /Paso/i,
  longer_alt: Identificador
});

export const Hacer = createToken({
  name: "Hacer",
  pattern: /Hacer/i,
  longer_alt: Identificador
});

export const FinPara = createToken({
  name: "FinPara",
  pattern: /FinPara/i,
  longer_alt: Identificador
});

export const Mientras = createToken({
  name: "Mientras",
  pattern: /Mientras/i,
  longer_alt: Identificador
});

export const FinMientras = createToken({
  name: "FinMientras",
  pattern: /FinMientras/i,
  longer_alt: Identificador
});

export const Repetir = createToken({
  name: "Repetir",
  pattern: /Repetir/i,
  longer_alt: Identificador
});

export const Que = createToken({
  name: "Que",
  pattern: /Que/i,
  longer_alt: Identificador
});

export const Segun = createToken({
  name: "Segun",
  pattern: /Segun/i,
  longer_alt: Identificador
});

export const Caso = createToken({
  name: "Caso",
  pattern: /Caso/i,
  longer_alt: Identificador
});

export const DeOtroModo = createToken({
  name: "DeOtroModo",
  pattern: /DeOtroModo/i,
  longer_alt: Identificador
});

export const FinSegun = createToken({
  name: "FinSegun",
  pattern: /FinSegun/i,
  longer_alt: Identificador
});

export const Funcion = createToken({
  name: "Funcion",
  pattern: /Funcion/i,
  longer_alt: Identificador
});

export const FinFuncion = createToken({
  name: "FinFuncion",
  pattern: /FinFuncion/i,
  longer_alt: Identificador
});

export const Asignacion = createToken({
  name: "Asignacion",
  pattern: /<-/
});

export const Entero = createToken({
  name: "Entero",
  pattern: /Entero/i,
  longer_alt: Identificador
});

export const Real = createToken({
  name: "Real",
  pattern: /Real/i,
  longer_alt: Identificador
});

export const Caracter = createToken({
  name: "Caracter",
  pattern: /Caracter/i,
  longer_alt: Identificador
});

export const Logico = createToken({
  name: "Logico",
  pattern: /Logico/i,
  longer_alt: Identificador
});

export const Verdadero = createToken({
  name: "Verdadero",
  pattern: /Verdadero/i,
  longer_alt: Identificador
});

export const Falso = createToken({
  name: "Falso",
  pattern: /Falso/i,
  longer_alt: Identificador
});

export const LParen = createToken({ name: "LParen", pattern: /\(/ });
export const RParen = createToken({ name: "RParen", pattern: /\)/ });
export const Coma = createToken({ name: "Coma", pattern: /,/ });
export const DosPuntos = createToken({ name: "DosPuntos", pattern: /:/ });
export const PuntoYComa = createToken({ name: "PuntoYComa", pattern: /;/ });

// Operadores
export const Suma = createToken({ name: "Suma", pattern: /\+/ });
export const Resta = createToken({ name: "Resta", pattern: /-/ });
export const Multiplicacion = createToken({ name: "Multiplicacion", pattern: /\*/ });
export const Division = createToken({ name: "Division", pattern: /\// });
export const Modulo = createToken({ name: "Modulo", pattern: /%/ });
export const Potencia = createToken({ name: "Potencia", pattern: /\^/ });

// Operadores lógicos
export const Y = createToken({
  name: "Y",
  pattern: /Y/i,
  longer_alt: Identificador
});

export const O = createToken({
  name: "O", 
  pattern: /O/i,
  longer_alt: Identificador
});

export const No = createToken({
  name: "No",
  pattern: /No/i,
  longer_alt: Identificador
});

// Operadores de comparación
export const Igual = createToken({ name: "Igual", pattern: /=/ });
export const Diferente = createToken({ name: "Diferente", pattern: /<>/ });
export const Mayor = createToken({ name: "Mayor", pattern: />/ });
export const Menor = createToken({ name: "Menor", pattern: /</ });
export const MayorIgual = createToken({ name: "MayorIgual", pattern: />=/ });
export const MenorIgual = createToken({ name: "MenorIgual", pattern: /<=/ });

// Lista de todos los tokens
export const allTokens = [
  WhiteSpace,
  Comment,
  Numero,
  Cadena,
  Algoritmo,
  FinAlgoritmo,
  Definir,
  Como,
  Leer,
  Escribir,
  SiNo,
  Si,
  Entonces,
  FinSi,
  Para,
  Hasta,
  Con,
  Paso,
  Hacer,
  FinPara,
  Mientras,
  FinMientras,
  Repetir,
  Que,
  Segun,
  Caso,
  DeOtroModo,
  FinSegun,
  Funcion,
  FinFuncion,
  Entero,
  Real,
  Caracter,
  Logico,
  Verdadero,
  Falso,
  Asignacion,
  LParen,
  RParen,
  Coma,
  DosPuntos,
  PuntoYComa,
  Suma,
  Resta,
  Multiplicacion,
  Division,
  Modulo,
  Potencia,
  Y,
  O,
  No,
  Igual,
  Diferente,
  MayorIgual,
  MenorIgual,
  Mayor,
  Menor,
  Identificador
];