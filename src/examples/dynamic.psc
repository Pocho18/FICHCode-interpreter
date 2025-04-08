Algoritmo EjemploNoEstricto
    // En modo no estricto, no necesitamos definir variables explícitamente
    nombre <- "Juan"
    edad <- 25
    sueldo <- 1500.50
    
    // Operaciones condicionales
    Si edad >= 18 Entonces
        esMayorDeEdad <- Verdadero
        Escribir nombre, " es mayor de edad"
    SiNo
        esMayorDeEdad <- Falso
        Escribir nombre, " es menor de edad"
    FinSi
    
    // Entrada de datos
    Escribir "Ingrese su nombre:"
    Leer nombre
    
    Escribir "Ingrese su edad:"
    Leer edad
    
    // Ciclo Para
    Escribir "Contando del 1 al 5:"
    Para i <- 1 Hasta 5 Hacer
        Escribir "Número: ", i
    FinPara
    
    // Operaciones aritméticas
    a <- 10
    b <- 5
    
    suma <- a + b
    resta <- a - b
    multiplicacion <- a * b
    division <- a / b
    
    Escribir "Suma: ", suma
    Escribir "Resta: ", resta
    Escribir "Multiplicación: ", multiplicacion
    Escribir "División: ", division
    
    Escribir "Programa finalizado"
FinAlgoritmo