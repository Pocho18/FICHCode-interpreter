import { PSEintInterpreter } from '@/interpreter/interpreter.js';
import { Commands } from './commands.js';
import * as readline from 'readline';

export class REPL {
  private interpreter: PSEintInterpreter;
  private commands: Commands;
  private rl: readline.Interface;
  private buffer: string = '';
  
  constructor(options: { strictMode?: boolean } = {}) {
    this.interpreter = new PSEintInterpreter({ strictMode: options.strictMode });
    this.commands = new Commands(this.interpreter);
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'PSEint> '
    });
  }
  
  async start(): Promise<void> {
    const strictModeStatus = this.interpreter.getOptions().strictMode ? 'estricto' : 'no estricto';
    
    console.log('Intérprete PSEint - Modo Interactivo');
    console.log(`Modo actual: ${strictModeStatus}`);
    console.log('Escriba "salir" o use Ctrl+C para salir');
    console.log('Escriba "ejecutar" para evaluar el código ingresado');
    console.log('Escriba "help" para ver los comandos disponibles');
    console.log('Ingrese el código del algoritmo:');
    
    this.rl.prompt();
    
    this.rl.on('line', async (line) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.toLowerCase() === 'salir') {
        this.close();
        return;
      }
      
      if (trimmedLine.toLowerCase() === 'ejecutar') {
        if (this.buffer.trim()) {
          try {
            await this.interpreter.interpret(this.buffer);
          } catch (error) {
            console.error(`Error: ${error.message}`);
          }
          this.buffer = '';
        } else {
          console.log('No hay código para ejecutar.');
        }
      } else if (trimmedLine.toLowerCase() === 'help' || trimmedLine.startsWith('strict ') || trimmedLine.toLowerCase() === 'clear') {
        // Procesar comandos
        const response = this.commands.processCommand(trimmedLine);
        console.log(response);
      } else {
        this.buffer += line + '\n';
      }
      
      this.rl.prompt();
    });
    
    this.rl.on('close', () => {
      this.close();
    });
  }
  
  close(): void {
    console.log('¡Hasta luego!');
    this.interpreter.close();
    process.exit(0);
  }
}