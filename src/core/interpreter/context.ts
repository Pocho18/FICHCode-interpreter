import { Variable } from './types.js';

export class ExecutionContext {
  private variables: Map<string, Variable>;
  
  constructor() {
    this.variables = new Map<string, Variable>();
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
    if (!variable) {
      throw new Error(`Variable no definida: ${name}`);
    }
    return variable;
  }
  
  // Asignar un valor a una variable existente
  assignVariable(name: string, value: any): void {
    const variable = this.getVariable(name);
    variable.value = this.convertToType(value, variable.type);
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
  
  // Limpiar todas las variables
  clear(): void {
    this.variables.clear();
  }
}