import { CstParser } from "chevrotain";
import { allTokens, Algoritmo, Identificador, FinAlgoritmo, Definir, Como, 
  Asignacion, Entero, Real, Caracter, Logico, Leer, Coma, Escribir, Si, 
  Entonces, SiNo, FinSi, Para, Hasta, Con, Paso, Hacer, FinPara, Mientras, 
  FinMientras, Repetir, Que, Segun, Caso, DosPuntos, DeOtroModo, FinSegun, 
  LParen, RParen, Y, O, Igual, Diferente, Mayor, Menor, MayorIgual, MenorIgual, 
  Suma, Resta, Multiplicacion, Division, Modulo, Numero, Cadena, Verdadero, 
  Falso, No } from "../lexer/tokens.js";

export class PSEintParser extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  // Definición de reglas
  algoritmo = this.RULE("algoritmo", () => {
    this.CONSUME(Algoritmo);
    this.CONSUME(Identificador);
    this.MANY(() => {
      this.SUBRULE(this.instruccion);
    });
    this.CONSUME(FinAlgoritmo);
  });

  instruccion = this.RULE("instruccion", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.definicion) },
      { ALT: () => this.SUBRULE(this.asignacion) },
      { ALT: () => this.SUBRULE(this.lectura) },
      { ALT: () => this.SUBRULE(this.escritura) },
      { ALT: () => this.SUBRULE(this.condicional) },
      { ALT: () => this.SUBRULE(this.bucleFor) },
      { ALT: () => this.SUBRULE(this.bucleWhile) },
      { ALT: () => this.SUBRULE(this.bucleDoWhile) },
      { ALT: () => this.SUBRULE(this.seleccionMultiple) }
    ]);
  });

  definicion = this.RULE("definicion", () => {
    this.CONSUME(Definir);
    this.CONSUME(Identificador);
    this.CONSUME(Como);
    this.SUBRULE(this.tipo);
    this.OPTION(() => {
      this.CONSUME(Asignacion);
      this.SUBRULE(this.expresion);
    });
  });

  tipo = this.RULE("tipo", () => {
    this.OR([
      { ALT: () => this.CONSUME(Entero) },
      { ALT: () => this.CONSUME(Real) },
      { ALT: () => this.CONSUME(Caracter) },
      { ALT: () => this.CONSUME(Logico) }
    ]);
  });

  asignacion = this.RULE("asignacion", () => {
    this.CONSUME(Identificador);
    this.CONSUME(Asignacion);
    this.SUBRULE(this.expresion);
  });

  lectura = this.RULE("lectura", () => {
    this.CONSUME(Leer);
    this.CONSUME(Identificador);
    this.MANY(() => {
      this.CONSUME(Coma);
      this.CONSUME2(Identificador);
    });
  });

  escritura = this.RULE("escritura", () => {
    this.CONSUME(Escribir);
    this.SUBRULE(this.expresion);
    this.MANY(() => {
      this.CONSUME(Coma);
      this.SUBRULE2(this.expresion);
    });
  });

  condicional = this.RULE("condicional", () => {
    this.CONSUME(Si);
    this.SUBRULE(this.expresion);
    this.CONSUME(Entonces);
    this.MANY(() => {
      this.SUBRULE(this.instruccion);
    });
    this.OPTION(() => {
      this.CONSUME(SiNo);
      this.MANY2(() => {
        this.SUBRULE2(this.instruccion);
      });
    });
    this.CONSUME(FinSi);
  });

  bucleFor = this.RULE("bucleFor", () => {
    this.CONSUME(Para);
    this.CONSUME(Identificador);
    this.CONSUME(Asignacion);
    this.SUBRULE(this.expresion);
    this.CONSUME(Hasta);
    this.SUBRULE2(this.expresion);
    this.OPTION(() => {
      this.CONSUME(Con);
      this.CONSUME(Paso);
      this.SUBRULE3(this.expresion);
    });
    this.CONSUME(Hacer);
    this.MANY(() => {
      this.SUBRULE(this.instruccion);
    });
    this.CONSUME(FinPara);
  });

  bucleWhile = this.RULE("bucleWhile", () => {
    this.CONSUME(Mientras);
    this.SUBRULE(this.expresion);
    this.CONSUME(Hacer);
    this.MANY(() => {
      this.SUBRULE(this.instruccion);
    });
    this.CONSUME(FinMientras);
  });

  bucleDoWhile = this.RULE("bucleDoWhile", () => {
    this.CONSUME(Repetir);
    this.MANY(() => {
      this.SUBRULE(this.instruccion);
    });
    this.CONSUME(Hasta);
    this.CONSUME(Que);
    this.SUBRULE(this.expresion);
  });

  seleccionMultiple = this.RULE("seleccionMultiple", () => {
    this.CONSUME(Segun);
    this.SUBRULE(this.expresion);
    this.CONSUME(Hacer);
    this.MANY(() => {
      this.CONSUME(Caso);
      this.SUBRULE2(this.expresion);
      this.CONSUME(DosPuntos);
      this.MANY2(() => {
        this.SUBRULE(this.instruccion);
      });
    });
    this.OPTION(() => {
      this.CONSUME(DeOtroModo);
      this.CONSUME2(DosPuntos);
      this.MANY3(() => {
        this.SUBRULE3(this.instruccion);
      });
    });
    this.CONSUME(FinSegun);
  });

  expresion = this.RULE("expresion", () => {
    this.SUBRULE(this.expresionLogica);
  });

  expresionLogica = this.RULE("expresionLogica", () => {
    this.SUBRULE(this.expresionComparacion);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(Y) },
        { ALT: () => this.CONSUME(O) }
      ]);
      this.SUBRULE2(this.expresionComparacion);
    });
  });

  expresionComparacion = this.RULE("expresionComparacion", () => {
    this.SUBRULE(this.expresionAritmetica);
    this.OPTION(() => {
      this.OR([
        { ALT: () => this.CONSUME(Igual) },
        { ALT: () => this.CONSUME(Diferente) },
        { ALT: () => this.CONSUME(Mayor) },
        { ALT: () => this.CONSUME(Menor) },
        { ALT: () => this.CONSUME(MayorIgual) },
        { ALT: () => this.CONSUME(MenorIgual) }
      ]);
      this.SUBRULE2(this.expresionAritmetica);
    });
  });

  expresionAritmetica = this.RULE("expresionAritmetica", () => {
    this.SUBRULE(this.termino);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(Suma) },
        { ALT: () => this.CONSUME(Resta) }
      ]);
      this.SUBRULE2(this.termino);
    });
  });

  termino = this.RULE("termino", () => {
    this.SUBRULE(this.factor);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(Multiplicacion) },
        { ALT: () => this.CONSUME(Division) },
        { ALT: () => this.CONSUME(Modulo) }
      ]);
      this.SUBRULE2(this.factor);
    });
  });

  factor = this.RULE("factor", () => {
    this.OR([
      { ALT: () => this.CONSUME(Numero) },
      { ALT: () => this.CONSUME(Cadena) },
      { ALT: () => this.CONSUME(Identificador) },
      { ALT: () => this.CONSUME(Verdadero) },
      { ALT: () => this.CONSUME(Falso) },
      { ALT: () => {
          this.CONSUME(LParen);
          this.SUBRULE(this.expresion);
          this.CONSUME(RParen);
        }
      },
      { ALT: () => {
          this.CONSUME(No);
          this.SUBRULE2(this.factor);
        }
      },
      { ALT: () => {
          this.CONSUME(Resta);
          this.SUBRULE3(this.factor);
        }
      }
    ]);
  });
}