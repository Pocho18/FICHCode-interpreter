import { PSEintInterpreter } from '@/interpreter/interpreter.js';
import * as readline from 'readline';

export class REPL {
  private interpreter: PSEintInterpreter;
  private rl: readline.Interface;
  private buffer: string = '';
  
  constructor() {
    this.interpreter = new PSEintInterpreter();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'PSEint> '
    });
  }
  
  async start(): Promise<void> {
    console.log('Intérprete PSEint - Modo Interactivo');
    console.log('Escriba "salir" o use Ctrl+C para salir');
    console.log('Escriba "ejecutar" para evaluar el código ingresado');
    console.log('Ingrese el código del algoritmo:');
    
    this.rl.prompt();
    
    this.rl.on('line', async (line) => {
      if (line.trim().toLowerCase() === 'salir') {
        this.close();
        return;
      }
      
      if (line.trim().toLowerCase() === 'ejecutar') {
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