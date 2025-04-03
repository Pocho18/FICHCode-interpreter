import { tokenize } from '../lexer/lexer.js';
import { parse } from '../parser/parser.js';
import { ExecutionContext } from './context.js';
import { ExpressionEvaluator } from './evaluator.js';
import { ConsoleIO } from '../../utils/console-io.js';
import { ErrorHandler } from '../../utils/error-handler.js';

export class PSEintInterpreter {
  private context: ExecutionContext;
  private evaluator: ExpressionEvaluator;
  private io: ConsoleIO;
  private errorHandler: ErrorHandler;
  
  constructor() {
    this.context = new ExecutionContext();
    this.evaluator = new ExpressionEvaluator(this.context);
    this.io = new ConsoleIO();
    this.errorHandler = new ErrorHandler();
  }
  
  async interpret(code: string): Promise<void> {
    try {
      // Tokenización
      const tokens = tokenize(code);
      
      // Análisis sintáctico
      const cst = parse(tokens);
      
      // Ejecución
      await this.executeProgram(cst);
      
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  
  async executeProgram(cst: any): Promise<void> {
    // Obtener información del algoritmo
    const nombreAlgoritmo = cst.children.Identificador[0].image;
    console.log(`Ejecutando algoritmo: ${nombreAlgoritmo}`);
    
    // Ejecutar las instrucciones secuencialmente
    if (cst.children.instruccion) {
      for (const instruccion of cst.children.instruccion) {
        await this.executeInstruction(instruccion);
      }
    }
    
    console.log("Ejecución finalizada");
  }
  
  async executeInstruction(instruccionNode: any): Promise<void> {
    // Determinar el tipo de instrucción
    const children = instruccionNode.children;
    
    if (children.definicion) {
      await this.executeDefinicion(children.definicion[0]);
    } else if (children.asignacion) {
      await this.executeAsignacion(children.asignacion[0]);
    } else if (children.lectura) {
      await this.executeLectura(children.lectura[0]);
    } else if (children.escritura) {
      await this.executeEscritura(children.escritura[0]);
    } else if (children.condicional) {
      await this.executeCondicional(children.condicional[0]);
    } else if (children.bucleFor) {
      await this.executeBucleFor(children.bucleFor[0]);
    } else if (children.bucleWhile) {
      await this.executeBucleWhile(children.bucleWhile[0]);
    } else if (children.bucleDoWhile) {
      await this.executeBucleDoWhile(children.bucleDoWhile[0]);
    } else if (children.seleccionMultiple) {
      await this.executeSeleccionMultiple(children.seleccionMultiple[0]);
    }
  }
  
  async executeDefinicion(definicionNode: any): Promise<void> {
    const nombreVariable = definicionNode.children.Identificador[0].image;
    const tipoVariable = definicionNode.children.tipo[0].children;
    
    let tipo = 'Entero'; // Tipo por defecto
    
    // Determinar el tipo
    if (tipoVariable.Entero) {
      tipo = 'Entero';
    } else if (tipoVariable.Real) {
      tipo = 'Real';
    } else if (tipoVariable.Caracter) {
      tipo = 'Caracter';
    } else if (tipoVariable.Logico) {
      tipo = 'Logico';
    }
    
    // Verificar si hay asignación inicial
    let valorInicial = null;
    if (definicionNode.children.Asignacion) {
      valorInicial = this.evaluator.evaluate(definicionNode.children.expresion[0]);
    }
    
    // Definir la variable
    this.context.defineVariable(nombreVariable, tipo, valorInicial);
  }
  
  async executeAsignacion(asignacionNode: any): Promise<void> {
    const nombreVariable = asignacionNode.children.Identificador[0].image;
    const valorExpresion = this.evaluator.evaluate(asignacionNode.children.expresion[0]);
    
    this.context.assignVariable(nombreVariable, valorExpresion);
  }
  
  async executeLectura(lecturaNode: any): Promise<void> {
    // Obtener todos los identificadores
    const identificadores = lecturaNode.children.Identificador;
    
    for (const id of identificadores) {
      const nombreVariable = id.image;
      const variable = this.context.getVariable(nombreVariable);
      
      let valor;
      try {
        valor = await this.io.readInput(`Ingrese valor para ${nombreVariable} (${variable.type}): `);
        
        // Convertir el valor según el tipo
        this.context.assignVariable(nombreVariable, valor);
      } catch (error) {
        this.errorHandler.handleError(new Error(`Error leyendo variable ${nombreVariable}: ${error.message}`));
      }
    }
  }
  
  async executeEscritura(escrituraNode: any): Promise<void> {
    // Obtener todas las expresiones a escribir
    const expresiones = escrituraNode.children.expresion;
    let output = '';
    
    for (const expr of expresiones) {
      const valor = this.evaluator.evaluate(expr);
      output += valor !== null && valor !== undefined ? valor : '';
    }
    
    this.io.print(output);
  }
  
  async executeCondicional(condicionalNode: any): Promise<void> {
    const condicion = this.evaluator.evaluate(condicionalNode.children.expresion[0]);
    
    if (condicion) {
      // Ejecutar instrucciones en el bloque ENTONCES
      if (condicionalNode.children.instruccion) {
        for (const instruccion of condicionalNode.children.instruccion) {
          await this.executeInstruction(instruccion);
        }
      }
    } else if (condicionalNode.children.SiNo) {
      // Ejecutar instrucciones en el bloque SINO
      const instruccionesSiNo = condicionalNode.children.instruccion.slice(
        condicionalNode.children.SiNo[0].startOffset
      );
      
      for (const instruccion of instruccionesSiNo) {
        await this.executeInstruction(instruccion);
      }
    }
  }
  
  async executeBucleFor(bucleForNode: any): Promise<void> {
    const nombreVariable = bucleForNode.children.Identificador[0].image;
    const valorInicial = this.evaluator.evaluate(bucleForNode.children.expresion[0]);
    const valorFinal = this.evaluator.evaluate(bucleForNode.children.expresion[1]);
    
    // Determinar el paso
    let paso = 1;
    if (bucleForNode.children.Paso) {
      paso = this.evaluator.evaluate(bucleForNode.children.expresion[2]);
    }
    
    // Si la variable no existe, crearla
    if (!this.context.hasVariable(nombreVariable)) {
      this.context.defineVariable(nombreVariable, 'Entero', valorInicial);
    } else {
      this.context.assignVariable(nombreVariable, valorInicial);
    }
    
    // Ejecutar el bucle
    let valorActual = valorInicial;
    
    while ((paso > 0 && valorActual <= valorFinal) || 
           (paso < 0 && valorActual >= valorFinal)) {
      
      // Ejecutar las instrucciones del bucle
      if (bucleForNode.children.instruccion) {
        for (const instruccion of bucleForNode.children.instruccion) {
          await this.executeInstruction(instruccion);
        }
      }
      
      // Incrementar el valor
      valorActual += paso;
      this.context.assignVariable(nombreVariable, valorActual);
    }
  }
  
  async executeBucleWhile(bucleWhileNode: any): Promise<void> {
    while (this.evaluator.evaluate(bucleWhileNode.children.expresion[0])) {
      // Ejecutar las instrucciones del bucle
      if (bucleWhileNode.children.instruccion) {
        for (const instruccion of bucleWhileNode.children.instruccion) {
          await this.executeInstruction(instruccion);
        }
      }
    }
  }
  
  async executeBucleDoWhile(bucleDoWhileNode: any): Promise<void> {
    do {
      // Ejecutar las instrucciones del bucle
      if (bucleDoWhileNode.children.instruccion) {
        for (const instruccion of bucleDoWhileNode.children.instruccion) {
          await this.executeInstruction(instruccion);
        }
      }
    } while (!this.evaluator.evaluate(bucleDoWhileNode.children.expresion[0]));
  }
  
  async executeSeleccionMultiple(seleccionNode: any): Promise<void> {
    const valorExpresion = this.evaluator.evaluate(seleccionNode.children.expresion[0]);
    let casoEncontrado = false;
    
    // Verificar cada caso
    if (seleccionNode.children.Caso) {
      for (let i = 0; i < seleccionNode.children.Caso.length; i++) {
        const valorCaso = this.evaluator.evaluate(seleccionNode.children.expresion[i + 1]);
        
        if (valorExpresion === valorCaso) {
          casoEncontrado = true;
          
          // Encontrar las instrucciones para este caso
          // Esto es simplificado, en una implementación real se necesita
          // más lógica para identificar las instrucciones entre casos
          const instruccionesDelCaso = seleccionNode.children.instruccion.slice(
            // En una implementación real, determinar el índice de inicio y fin apropiados
            i * 2, (i + 1) * 2
          );
          
          for (const instruccion of instruccionesDelCaso) {
            await this.executeInstruction(instruccion);
          }
          
          break;
        }
      }
    }
    
    // Ejecutar DeOtroModo si no se encontró un caso
    if (!casoEncontrado && seleccionNode.children.DeOtroModo) {
      // Ejecutar instrucciones del DeOtroModo
      // Simplificado, en una implementación real se necesita más lógica
      const instruccionesDeOtroModo = seleccionNode.children.instruccion.slice(
        // En una implementación real, determinar el índice apropiado
        seleccionNode.children.Caso.length * 2
      );
      
      for (const instruccion of instruccionesDeOtroModo) {
        await this.executeInstruction(instruccion);
      }
    }
  }
  
  close(): void {
    this.io.close();
  }
}