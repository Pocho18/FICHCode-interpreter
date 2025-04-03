export class ErrorHandler {
    handleError(error: Error): void {
        console.error(`[ERROR] ${error.message}`);
        
        // Dependiendo del tipo de error, se podría tener lógica adicional
        // para diferentes tipos de errores (léxico, sintáctico, semántico, etc.)
        if (error.message.includes('léxico')) {
            console.error('Error en el análisis léxico. Verifique la sintaxis del código.');
        } else if (error.message.includes('sintáctico')) {
            console.error('Error en el análisis sintáctico. Verifique la estructura del código.');
        } else if (error.message.includes('División por cero')) {
            console.error('Error matemático: División por cero.');
        }
    }
}