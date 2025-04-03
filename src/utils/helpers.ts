// Funciones auxiliares que pueden ser utilizadas en diferentes partes del intérprete

/**
* Intenta convertir una cadena a un número
*/
export function tryParseNumber(value: string): number | null {
    const parsedValue = Number(value);
    
    if (!isNaN(parsedValue)) {
        return parsedValue;
    }
    
    return null;
}

/**
* Intenta convertir una cadena a un booleano según las palabras clave de PSEint
*/
export function tryParseBoolean(value: string): boolean | null {
    if (value.toLowerCase() === 'verdadero') {
        return true;
    } else if (value.toLowerCase() === 'falso') {
        return false;
    }
    
    return null;
}

/**
* Formatea un valor para mostrarlo según el tipo de dato de PSEint
*/
export function formatValue(value: any): string {
    if (value === null || value === undefined) {
        return '';
    }
    
    if (typeof value === 'boolean') {
        return value ? 'Verdadero' : 'Falso';
    }
    
    return String(value);
}