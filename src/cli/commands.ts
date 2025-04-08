import { PSEintInterpreter } from '@/interpreter/interpreter.js';

export class Commands {
  private interpreter: PSEintInterpreter;
  
  constructor(interpreter: PSEintInterpreter) {
    this.interpreter = interpreter;
  }
  
  // Comando para cambiar el modo estricto/no estricto
  setStrictMode(args: string[]): string {
    if (args.length === 0) {
      const currentMode = this.interpreter.getOptions().strictMode;
      return `El modo estricto está ${currentMode ? 'activado' : 'desactivado'}`;
    }
    
    const value = args[0].toLowerCase();
    if (value === 'true' || value === 'on' || value === 'si' || value === 'sí') {
      this.interpreter.setOptions({ strictMode: true });
      return 'Modo estricto activado';
    } else if (value === 'false' || value === 'off' || value === 'no') {
      this.interpreter.setOptions({ strictMode: false });
      return 'Modo estricto desactivado';
    }
    
    return 'Valor no válido. Use "true" o "false"';
  }
  
  // Comando para obtener ayuda
  getHelp(): string {
    return `
Comandos disponibles:
  strict [true|false] - Activa o desactiva el modo estricto
  help - Muestra esta ayuda
  clear - Limpia la pantalla
  salir - Sale del intérprete
  ejecutar - Ejecuta el código ingresado
`;
  }
  
  // Comando para limpiar la pantalla
  clearScreen(): string {
    console.clear();
    return 'Pantalla limpiada';
  }
  
  // Procesar un comando
  processCommand(command: string): string {
    const parts = command.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    switch (cmd) {
      case 'strict':
        return this.setStrictMode(args);
      case 'help':
        return this.getHelp();
      case 'clear':
        return this.clearScreen();
      default:
        return `Comando desconocido: ${cmd}. Escriba "help" para ver la lista de comandos.`;
    }
  }
}