import * as readline from 'readline';

export class ConsoleIO {
  private rl: readline.Interface;
  
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }
  
  async readInput(prompt: string): Promise<string> {
    return new Promise<string>((resolve) => {
      this.rl.question(prompt, (answer) => {
        resolve(answer);
      });
    });
  }
  
  print(message: string): void {
    console.log(message);
  }
  
  close(): void {
    this.rl.close();
  }
}