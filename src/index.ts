import { PSEintInterpreter } from '@/interpreter/interpreter.js';
import fs from 'fs';
import path from 'path';

async function main() {
  const interpreter = new PSEintInterpreter();
  
  try {
    // Verificar si se proporcionó un archivo como argumento
    const args = process.argv.slice(2);
    
    if (args.length > 0) {
      // Ejecutar desde archivo
      const filePath = args[0];
      const code = fs.readFileSync(path.resolve(filePath), 'utf8');
      await interpreter.interpret(code);
    } else {
      // Ejecutar un ejemplo por defecto
      const pseudocode = `
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