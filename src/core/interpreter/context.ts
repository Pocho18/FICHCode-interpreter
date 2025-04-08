import { Variable } from './types.js';
import { InterpreterOptions, DEFAULT_OPTIONS } from '@/config/options.js';

export class ExecutionContext {
  private variables: Map<string, Variable>;
  private options: InterpreterOptions;
  
  constructor(options: Partial<InterpreterOptions> = {}) {
    this.variables = new Map<string, Variable>();
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }
  
  // Definir una nueva variable
  defineVariable(name: string, type: string, initialValue: any = null): void {
    const lowerCaseType = type.toLowerCase();
    
    // Convertir el valor inicial al tipo adecuado si existe
    let value = initialValue;
    if (initialValue !== null) {
      value = this.convertToType(initialValue, lowerCaseType);
    }
    
    this.variables.set(name, {
      name,
      type: lowerCaseType as any,
      value
    });
  }
  
  // Obtener una variable
  getVariable(name: string): Variable {
    const variable = this.variables.get(name);
    
    // En modo no estricto, si la variable no existe, la creamos automáticamente
    if (!variable) {
      if (!this.options.strictMode) {
        // En modo no estricto, se crea la variable automáticamente como tipo "Indefinido"
        // El tipo real se determinará cuando se le asigne un valor
        this.defineVariable(name, 'Indefinido', null);
        return this.variables.get(name)!;
      }
      throw new Error(`Variable no definida: ${name}`);
    }
    
    return variable;
  }
  
  // Asignar un valor a una variable
  assignVariable(name: string, value: any): void {
    // En modo no estricto, crear la variable si no existe
    if (!this.hasVariable(name) && !this.options.strictMode) {
      const inferredType = this.inferType(value);
      this.defineVariable(name, inferredType, value);
      return;
    }
    
    const variable = this.getVariable(name);
    
    // Si la variable tiene un tipo "Indefinido", inferir el tipo a partir del valor
    if (variable.type === 'Indefinido') {
      variable.type = this.inferType(value);
    }
    
    variable.value = this.convertToType(value, variable.type);
  }
  
  // Inferir el tipo de un valor
  inferType(value: any): string {
    if (typeof value === 'number') {
      // Si el número es entero
      if (Number.isInteger(value)) {
        return 'entero';
      }
      return 'real';
    }
    
    if (typeof value === 'string') {
      return 'caracter';
    }
    
    if (typeof value === 'boolean') {
      return 'logico';
    }
    
    return 'indefinido';
  }
  
  // Convertir un valor al tipo especificado
  convertToType(value: any, type: string): any {
    switch (type.toLowerCase()) {
      case 'entero':
        return Math.floor(Number(value));
      case 'real':
        return Number(value);
      case 'caracter':
        return String(value);
      case 'logico':
        if (typeof value === 'string') {
          return value.toLowerCase() === 'verdadero';
        }
        return Boolean(value);
      case 'indefinido':
        return value; // Mantener el valor tal cual
      default:
        return value;
    }
  }
  
  // Verificar si una variable existe
  hasVariable(name: string): boolean {
    return this.variables.has(name);
  }
  
  // Obtener todas las variables
  getAllVariables(): Map<string, Variable> {
    return new Map(this.variables);
  }
  
  // Cambiar las opciones del contexto
  setOptions(options: Partial<InterpreterOptions>): void {
    this.options = { ...this.options, ...options };
  }
  
  // Obtener las opciones actuales
  getOptions(): InterpreterOptions {
    return { ...this.options };
  }
  
  // Limpiar todas las variables
  clear(): void {
    this.variables.clear();
  }
}