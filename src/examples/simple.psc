Algoritmo EjemploBasico
    // Definición de variables
    Definir nombre Como Caracter
    Definir edad Como Entero
    Definir sueldo Como Real
    Definir esMayorDeEdad Como Logico
    Definir contador Como Entero
    Definir calificacion como Entero
    Definir a como Entero
    Definir b como Entero
    Definir suma como Entero
    Definir resta como Entero
    Definir multiplicacion como Entero
    Definir division como Real
    
    // Asignación de valores
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
    
    // Ciclo Mientras
    Escribir "Contando del 5 al 1:"
    contador <- 5
    Mientras contador > 0 Hacer
        Escribir "Número: ", contador
        contador <- contador - 1
    FinMientras
    
    // Decisión múltiple
    Escribir "Evaluando calificación:"
    calificacion <- 85
    
    Segun calificacion Hacer
        Caso 100:
            Escribir "Excelente"
        Caso 90:
            Escribir "Muy bien"
        Caso 80:
            Escribir "Bien"
        Caso 70:
            Escribir "Regular"
        DeOtroModo:
            Escribir "Necesita mejorar"
    FinSegun
    
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