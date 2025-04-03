import { PSEintInterpreter } from '../core/interpreter/interpreter.js';
import { REPL } from './repl.js';
import * as fs from 'fs';
import * as path from 'path';

const VERSION = '1.0.0';

async function main() {
  const args = process.argv.slice(2);
  const comando = args[0];
  
  if (!comando || comando === '--help' || comando === '-h') {
    mostrarAyuda();
    return;
  }
  
  if (comando === '--version' || comando === '-v') {
    console.log(`PSEint Intérprete v${VERSION}`);
    return;
  }
  
  if (comando === 'repl' || comando === '--repl') {
    const repl = new REPL();
    await repl.start();
    return;
  }
  
  // Intentar ejecutar un archivo
  const filePath = comando;
  
  if (!fs.existsSync(filePath)) {
    console.error(`Error: El archivo '${filePath}' no existe.`);
    process.exit(1);
  }
  
  try {
    const code = fs.readFileSync(path.resolve(filePath), 'utf8');
    const interpreter = new PSEintInterpreter();
    
    await interpreter.interpret(code);
    interpreter.close();
  } catch (error) {
    console.error(`Error al ejecutar el archivo: ${error.message}`);
    process.exit(1);
  }
}

function mostrarAyuda() {
  console.log(`
PSEint Intérprete - v${VERSION}

Uso:
  node dist/cli/index.js [opciones] [archivo]

Opciones:
  --help, -h      Muestra esta ayuda
  --version, -v   Muestra la versión
  repl, --repl    Inicia el modo interactivo (REPL)

Ejemplos:
  node dist/cli/index.js mi_algoritmo.psc     Ejecuta el archivo mi_algoritmo.psc
  node dist/cli/index.js repl                 Inicia el modo interactivo
  `);
}

main().catch(console.error);