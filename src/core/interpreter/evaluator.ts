import { ExecutionContext } from './context';
import { VisitorMap } from './types';

export class ExpressionEvaluator {
  private context: ExecutionContext;
  private visitors: VisitorMap;
  
  constructor(context: ExecutionContext) {
    this.context = context;
    this.visitors = this.createVisitors();
  }
  
  // Evalúa un nodo del CST (Concrete Syntax Tree)
  evaluate(node: any): any {
    if (!node) return null;
    
    const nodeType = node.name;
    if (this.visitors[nodeType]) {
      return this.visitors[nodeType](node);
    }
    
    // Si es un token directo, retornar su valor
    if (node.image) {
      return this.processTokenValue(node);
    }
    
    // Si tiene children, evaluar recursivamente el primer hijo
    if (node.children && Object.keys(node.children).length > 0) {
      const firstChildKey = Object.keys(node.children)[0];
      return this.evaluate(node.children[firstChildKey][0]);
    }
    
    return null;
  }
  
  // Procesa el valor de un token según su tipo
  private processTokenValue(token: any): any {
    if (token.tokenType && token.tokenType.name) {
      switch (token.tokenType.name) {
        case 'Numero':
          return token.image.includes('.') ? 
            parseFloat(token.image) : parseInt(token.image);
        case 'Cadena':
          // Remover las comillas
          return token.image.substring(1, token.image.length - 1);
        case 'Identificador':
          return this.context.getVariable(token.image).value;
        case 'Verdadero':
          return true;
        case 'Falso':
          return false;
        default:
          return token.image;
      }
    }
    return token.image;
  }
  
  // Crear mapa de visitantes para cada tipo de nodo
  private createVisitors(): VisitorMap {
    return {
      // Visitar expresión
      expresion: (ctx: any) => {
        return this.evaluate(ctx.children.expresionLogica[0]);
      },
      
      // Visitar expresión lógica
      expresionLogica: (ctx: any) => {
        let result = this.evaluate(ctx.children.expresionComparacion[0]);
        
        // Procesar operadores lógicos Y, O
        if (ctx.children.Y || ctx.children.O) {
          const operadores = [];
          const expresiones = ctx.children.expresionComparacion;
          
          // Recolectar operadores
          if (ctx.children.Y) operadores.push(...ctx.children.Y);
          if (ctx.children.O) operadores.push(...ctx.children.O);
          
          // Ordenar operadores por posición en el texto
          operadores.sort((a: any, b: any) => a.startOffset - b.startOffset);
          
          // Aplicar operadores en orden
          for (let i = 0; i < operadores.length; i++) {
            const operador = operadores[i].image.toLowerCase();
            const siguienteValor = this.evaluate(expresiones[i + 1]);
            
            if (operador === 'y') {
              result = result && siguienteValor;
            } else if (operador === 'o') {
              result = result || siguienteValor;
            }
          }
        }
        
        return result;
      },
      
      // Visitar expresión de comparación
      expresionComparacion: (ctx: any) => {
        const izquierda = this.evaluate(ctx.children.expresionAritmetica[0]);
        
        // Si hay un operador de comparación
        if (
          ctx.children.Igual || ctx.children.Diferente || 
          ctx.children.Mayor || ctx.children.Menor || 
          ctx.children.MayorIgual || ctx.children.MenorIgual
        ) {
          const derecha = this.evaluate(ctx.children.expresionAritmetica[1]);
          
          if (ctx.children.Igual) {
            return izquierda === derecha;
          } else if (ctx.children.Diferente) {
            return izquierda !== derecha;
          } else if (ctx.children.Mayor) {
            return izquierda > derecha;
          } else if (ctx.children.Menor) {
            return izquierda < derecha;
          } else if (ctx.children.MayorIgual) {
            return izquierda >= derecha;
          } else if (ctx.children.MenorIgual) {
            return izquierda <= derecha;
          }
        }
        
        return izquierda;
      },
      
      // Visitar expresión aritmética
      expresionAritmetica: (ctx: any) => {
        let resultado = this.evaluate(ctx.children.termino[0]);
        
        // Procesar operadores + y -
        if (ctx.children.Suma || ctx.children.Resta) {
          const operadores = [];
          const terminos = ctx.children.termino;
          
          if (ctx.children.Suma) operadores.push(...ctx.children.Suma);
          if (ctx.children.Resta) operadores.push(...ctx.children.Resta);
          
          operadores.sort((a: any, b: any) => a.startOffset - b.startOffset);
          
          for (let i = 0; i < operadores.length; i++) {
            const operador = operadores[i].image;
            const siguienteValor = this.evaluate(terminos[i + 1]);
            
            if (operador === '+') {
              resultado += siguienteValor;
            } else if (operador === '-') {
              resultado -= siguienteValor;
            }
          }
        }
        
        return resultado;
      },
      
      // Visitar término
      termino: (ctx: any) => {
        let resultado = this.evaluate(ctx.children.factor[0]);
        
        // Procesar operadores *, / y %
        if (ctx.children.Multiplicacion || ctx.children.Division || ctx.children.Modulo) {
          const operadores = [];
          const factores = ctx.children.factor;
          
          if (ctx.children.Multiplicacion) operadores.push(...ctx.children.Multiplicacion);
          if (ctx.children.Division) operadores.push(...ctx.children.Division);
          if (ctx.children.Modulo) operadores.push(...ctx.children.Modulo);
          
          operadores.sort((a: any, b: any) => a.startOffset - b.startOffset);
          
          for (let i = 0; i < operadores.length; i++) {
            const operador = operadores[i].image;
            const siguienteValor = this.evaluate(factores[i + 1]);
            
            if (operador === '*') {
              resultado *= siguienteValor;
            } else if (operador === '/') {
              if (siguienteValor === 0) {
                throw new Error('División por cero');
              }
              resultado /= siguienteValor;
            } else if (operador === '%') {
              resultado %= siguienteValor;
            }
          }
        }
        
        return resultado;
      },
      
      // Visitar factor
      factor: (ctx: any) => {
        // Número
        if (ctx.children.Numero) {
          const valor = ctx.children.Numero[0].image;
          return valor.includes('.') ? parseFloat(valor) : parseInt(valor);
        }
        
        // Cadena
        if (ctx.children.Cadena) {
          const valor = ctx.children.Cadena[0].image;
          // Remover comillas
          return valor.substring(1, valor.length - 1);
        }
        
        // Identificador (variable)
        if (ctx.children.Identificador) {
          const nombre = ctx.children.Identificador[0].image;
          return this.context.getVariable(nombre).value;
        }
        
        // Verdadero
        if (ctx.children.Verdadero) {
          return true;
        }
        
        // Falso
        if (ctx.children.Falso) {
          return false;
        }
        
        // Expresión entre paréntesis
        if (ctx.children.LParen) {
          return this.evaluate(ctx.children.expresion[0]);
        }
        
        // Negación
        if (ctx.children.No) {
          return !this.evaluate(ctx.children.factor[0]);
        }
        
        // Número negativo
        if (ctx.children.Resta) {
          return -this.evaluate(ctx.children.factor[0]);
        }
        
        return null;
      }
    };
  }
}