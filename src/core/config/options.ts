export interface InterpreterOptions {
    strictMode: boolean;  // true: requiere definición explícita de variables, false: modo no estricto
}

export const DEFAULT_OPTIONS: InterpreterOptions = {
    strictMode: true
};