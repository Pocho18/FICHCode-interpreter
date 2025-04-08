import { PSEintInterpreter } from '@/interpreter/interpreter.js';
import fs from 'fs';
import path from 'path';

async function main() {
  // Procesar argumentos de línea de comandos
  const args = process.argv.slice(2);
  let filePath: string | null = null;
  let strictMode = true; // Por defecto, modo estricto activado
  
  // Procesar argumentos
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--no-strict' || args[i] === '--no-stricto') {
      strictMode = false;
    } else if (!filePath && !args[i].startsWith('--')) {
      filePath = args[i];
    }
  }
  
  // Crear intérprete con las opciones adecuadas
  const interpreter = new PSEintInterpreter({ strictMode });
  
  console.log(`Intérprete PSEint - Modo ${strictMode ? 'estricto' : 'no estricto'}`);
  
  try {
    if (filePath) {
      // Ejecutar desde archivo
      const code = fs.readFileSync(path.resolve(filePath), 'utf8');
      await interpreter.interpret(code);
    } else {
      // Ejecutar un ejemplo por defecto adaptado al modo no estricto
      const pseudocode = strictMode ? 
        // Ejemplo para modo estricto
        `
        Algoritmo EjemploSimple
          Definir a Como Entero
          Definir b Como Entero
          Definir resultado Como Entero
          
          a <- 10
          b <- 20
          resultado <- a + b
          
          Escribir "La suma es: ", resultado
          
          Si resultado > 25 Entonces
            Escribir "El resultado es mayor que 25"
          SiNo
            Escribir "El resultado es menor o igual a 25"
          FinSi
          
          Para i <- 1 Hasta 5 Hacer
            Escribir "Iteración: ", i
          FinPara
        FinAlgoritmo
        ` :
        // Ejemplo para modo no estricto (sin definiciones explícitas)
        `
        Algoritmo EjemploNoEstricto
          // No necesitamos definir variables explícitamente
          a <- 10
          b <- 20
          resultado <- a + b
          
          Escribir "La suma es: ", resultado
          
          Si resultado > 25 Entonces
            Escribir "El resultado es mayor que 25"
          SiNo
            Escribir "El resultado es menor o igual a 25"
          FinSi
          
          Para i <- 1 Hasta 5 Hacer
            Escribir "Iteración: ", i
          FinPara
        FinAlgoritmo
        `;
      
      await interpreter.interpret(pseudocode);
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    interpreter.close();
  }
}

// Ejecutar el intérprete
main().catch(console.error);