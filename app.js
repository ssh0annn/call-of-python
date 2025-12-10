
// Lógica JavaScript para los escenarios dinámicos (SIN CAMBIOS RESPECTO AL CONTENIDO)

let currentScenarioIndex = 0;

// Array para rastrear qué escenarios han sido completados
let completionStatus;

// Definición de los escenarios de aprendizaje
const SCENARIOS = [
    {
        id: 0,
        title: "0. Introducción a Python",
        explanation: `Python es uno de los lenguajes de programación más populares del mundo. Es conocido por su sintaxis clara y legible, lo que lo hace perfecto para principiantes.

                <p class="mt-3"> Se utiliza en campos como desarrollo web, ciencia de datos, inteligencia artificial y automatización.</p>`,
        task: "No hay ejercicio en esta unidad. Presiona 'Siguiente Unidad' para comenzar.",
        validation: (code) => {
            // La unidad de introducción siempre se considera completada con el botón "Siguiente Unidad"
            return {
                success: true,
                feedback: "¡Bienvenido! Es hora de empezar a programar.",
                consoleOutput: "Iniciando el curso de Python..."
            };
        }
    },
    {
        id: 1,
        title: "1. Variables y Asignación",
        explanation: `Una variable es un nombre que se refiere a un valor en la memoria de la computadora. Es como una etiqueta que le pones a una caja para saber qué contiene.

                <p class="mt-3">Para asignar un valor, usamos el signo igual: <code>nombre_variable = valor</code>.</p>`,
        task: "Crea una variable llamada **'puntuacion'** y asígnale el valor entero **95**.",
        validation: (code) => {
            // Limpia el código para una validación simple (remueve espacios y minúsculas)
            const normalizedCode = code.replace(/\s/g, '').toLowerCase();

            // Regex para verificar si existe 'puntuacion=95'
            const regex = /puntuacion=95(?!.)/;

            if (!regex.test(normalizedCode)) {
                return { success: false, feedback: "Asegúrate de que la variable se llame exactamente 'puntuacion' y el valor sea el número '95'. Revisa la ortografía." };
            }
            return {
                success: true,
                feedback: "¡Excelente! La variable 'puntuacion' ha sido declarada y asignada correctamente.",
                consoleOutput: "La variable 'puntuacion' ha sido establecida a 95."
            };
        }
    },
    {
        id: 2,
        title: "2. Tipos de Datos: String e Impresión",
        explanation: `Una 'string' (cadena de texto) es una secuencia de caracteres, y siempre se encierra entre comillas (simples o dobles).

                <p class="mt-3">La función <code>print()</code> se usa para mostrar texto o el valor de una variable en la consola. Puedes concatenar (unir) strings con el operador <code>+</code>.</p>`,
        task: "Declara una variable **'saludo'** con el valor 'Hola ' (con un espacio final) y otra **'nombre'** con tu nombre. Luego, imprime la concatenación de ambas variables.",
        validation: (code) => {
            // Para simular la ejecución de Python, validaremos 3 partes:
            // 1. Declaración de saludo
            // 2. Declaración de nombre
            // 3. Uso de print() con la concatenación

            if (!/saludo\s*=\s*['"]Hola\s+['"]/.test(code) && !/saludo\s*=\s*['"]Hola\s*['"]/.test(code)) {
                return { success: false, feedback: "Falta o es incorrecta la variable 'saludo'. Debe contener 'Hola ' (con o sin comillas simples/dobles)." };
            }

            if (!/nombre\s*=\s*['"].+['"]/.test(code)) {
                return { success: false, feedback: "Falta o es incorrecta la variable 'nombre'. Asegúrate de que tenga un valor de string (ej. 'Mundo')." };
            }

            if (!/print\s*\(\s*saludo\s*\+\s*nombre\s*\)/.test(code)) {
                return { success: false, feedback: "Asegúrate de usar la función 'print(saludo + nombre)' para concatenar e imprimir las variables." };
            }

            return {
                success: true,
                feedback: "¡Correcto! Has usado variables de tipo string y la función 'print' para concatenarlas.",
                // Salida simulada de la consola
                consoleOutput: "Hola Mundo"
            };
        }
    },
    {
        id: 3,
        title: "3. Estructuras de Control: Condicionales (if/else)",
        explanation: `Las estructuras condicionales (<code>if</code>, <code>elif</code>, <code>else</code>) permiten que el programa tome decisiones. El bloque de código bajo un 'if' solo se ejecuta si la condición es verdadera (True).

                <p class="mt-3">¡Recuerda la indentación y los dos puntos (:)!</p>`,
        task: "Dado que ya existe la variable `numero = 15`. Escribe una estructura `if` que imprima **'El número es grande'** si `numero` es mayor que 10, y un `else` que imprima **'El número es pequeño'** en caso contrario.",
        validation: (code) => {
            const result = { success: false, feedback: "" };

            // 1. Verificar la estructura del if/else
            if (!/if\s+numero\s*>\s*10\s*:\s*print\s*\(['"]El número es grande['"]\)/s.test(code)) {
                result.feedback = "El bloque 'if' es incorrecto o no imprime el mensaje exacto: 'El número es grande'.";
                return result;
            }

            if (!/else\s*:\s*print\s*\(['"]El número es pequeño['"]\)/s.test(code)) {
                result.feedback = "El bloque 'else' es incorrecto o no imprime el mensaje exacto: 'El número es pequeño'.";
                return result;
            }

            return {
                success: true,
                feedback: "¡Fantástico! Has implementado el condicional 'if/else' correctamente.",
                // Salida simulada de la consola (dado que numero=15)
                consoleOutput: "El número es grande"
            };
        }
    },
    {
        id: 4,
        title: "4. Operaciones Aritméticas",
        explanation: `Python soporta las operaciones matemáticas básicas: suma (<code>+</code>), resta (<code>-</code>), multiplicación (<code>*</code>), división (<code>/</code>), y módulo (<code>%</code>, para obtener el residuo).

                <p class="mt-3">La jerarquía de operaciones se respeta (PEMDAS/BODMAS). Usa paréntesis para forzar un orden específico.</p>`,
        task: "Calcula el resultado de la siguiente expresión: `(20 + 5) * 2`. Almacena el resultado en una variable llamada **'total_calculado'** y luego imprímela.",
        validation: (code) => {
            const result = { success: false, feedback: "" };

            // 1. Verificar la asignación de la variable y la operación
            if (!/total_calculado\s*=\s*\(\s*20\s*\+\s*5\s*\)\s*\*\s*2/.test(code.replace(/\s/g, ''))) {
                result.feedback = "Asegúrate de asignar la variable 'total_calculado' con la operación `(20 + 5) * 2`.";
                return result;
            }

            // 2. Verificar el uso de print
            if (!/print\s*\(\s*total_calculado\s*\)/.test(code)) {
                result.feedback = "Debes usar la función 'print(total_calculado)' para mostrar el resultado.";
                return result;
            }

            return {
                success: true,
                feedback: "¡Cálculo exitoso! El orden de operaciones se aplicó correctamente.",
                // 50 es el resultado de (20 + 5) * 2
                consoleOutput: "50"
            };
        }
    },
    {
        id: 5,
        title: "5. Estructuras de Control: Bucle for",
        explanation: `El bucle <code>for</code> se utiliza para iterar sobre una secuencia (como una lista o un rango). Es ideal para repetir una tarea un número conocido de veces.

                <p class="mt-3">La función <code>range(n)</code> genera una secuencia de números desde 0 hasta **n-1**.</p>`,
        task: "Escribe un bucle `for` que itere 3 veces, usando `range(3)`, e imprima la palabra **'Repetición'** en cada iteración.",
        validation: (code) => {
            const result = { success: false, feedback: "" };

            // 1. Verificar la estructura del bucle for
            if (!/for\s+.+\s+in\s+range\s*\(\s*3\s*\)\s*:\s*print\s*\(['"]Repetición['"]\)/s.test(code)) {
                result.feedback = "Revisa tu sintaxis. Asegúrate de usar `for`, `range(3)` y la indentación correcta para imprimir 'Repetición'.";
                return result;
            }

            return {
                success: true,
                feedback: "¡Lo tienes! El bucle se ejecutó 3 veces. La iteración es clave en la programación.",
                // Salida simulada de la consola
                consoleOutput: "Repetición\nRepetición\nRepetición"
            };
        }
    },
    {
        id: 6,
        title: "6. Colecciones: Listas",
        explanation: `Las listas son una colección ordenada y modificable de ítems. Se definen con corchetes (<code>[]</code>) y pueden contener diferentes tipos de datos.

                <p class="mt-3">Accedes a los elementos mediante su índice (posición), que empieza en 0.</p>`,
        task: "Crea una lista llamada **'frutas'** con los elementos **'manzana'**, **'banana'** y **'cereza'**. Luego, imprime el elemento en la segunda posición (índice 1).",
        validation: (code) => {
            const result = { success: false, feedback: "" };
            const normalizedCode = code.replace(/\s/g, '').toLowerCase();

            // 1. Verificar la creación de la lista
            if (!/frutas=\['manzana','banana','cereza'\]/.test(normalizedCode)) {
                result.feedback = "Asegúrate de crear la lista 'frutas' exactamente con los tres elementos indicados.";
                return result;
            }

            // 2. Verificar la impresión del índice 1
            if (!/print\(frutas\[1\]\)/.test(normalizedCode)) {
                result.feedback = "Debes imprimir el elemento en la segunda posición usando 'print(frutas[1])'.";
                return result;
            }

            return {
                success: true,
                feedback: "¡Genial! Has creado y accedido correctamente a una lista. El elemento en el índice 1 es 'banana'.",
                consoleOutput: "banana"
            };
        }
    },
    {
        id: 7,
        title: "7. Estructuras de Control: Bucle while",
        explanation: `El bucle <code>while</code> repite un bloque de código **mientras** una condición sea verdadera. Es importante incluir una manera de que la condición se vuelva falsa para evitar un bucle infinito.

                <p class="mt-3">A menudo se usa para tareas que necesitan repetirse hasta que se cumpla un criterio desconocido.</p>`,
        task: "Usa un bucle `while` para imprimir los números desde 0 hasta 2 (inclusive). Usa una variable `contador` inicializada a 0 y la condición `contador < 3`. No olvides incrementar el contador.",
        validation: (code) => {
            const result = { success: false, feedback: "" };

            // Validación de la sintaxis y lógica básica
            if (!/contador\s*=\s*0/.test(code)) {
                result.feedback = "Asegúrate de inicializar la variable 'contador' a 0.";
                return result;
            }

            if (!/while\s+contador\s*<\s*3\s*:/.test(code)) {
                result.feedback = "El bucle 'while' debe usar la condición 'contador < 3'.";
                return result;
            }

            if (!/print\s*\(\s*contador\s*\)/s.test(code)) {
                result.feedback = "Debes imprimir el valor del 'contador' dentro del bucle.";
                return result;
            }

            if (!/contador\s*=\s*contador\s*\+\s*1/.test(code.replace(/\s/g, '')) && !/contador\s*\+=\s*1/.test(code.replace(/\s/g, ''))) {
                result.feedback = "Debes incrementar el 'contador' al final del bucle para evitar un bucle infinito.";
                return result;
            }

            return {
                success: true,
                feedback: "¡Bucle 'while' dominado! El código imprimió los números 0, 1 y 2, y luego se detuvo.",
                consoleOutput: "0\n1\n2"
            };
        }
    },
    {
        id: 8,
        title: "8. Modularidad: Funciones",
        explanation: `Una función es un bloque de código reutilizable que solo se ejecuta cuando se llama. Las funciones ayudan a organizar el código y evitar la repetición.

                <p class="mt-3">Se definen con la palabra clave <code>def</code>. Para ejecutarlas, las llamas por su nombre seguido de paréntesis (ej. <code>mi_funcion()</code>).</p>`,
        task: "Define una función llamada **'saludar'** que tome un argumento `nombre` e imprima el mensaje 'Hola, [nombre]!'. Llama a la función con el nombre **'Ana'**.",
        validation: (code) => {
            const result = { success: false, feedback: "" };

            // 1. Verificar la definición de la función
            if (!/def\s+saludar\s*\(\s*nombre\s*\)\s*:/.test(code)) {
                result.feedback = "Asegúrate de definir la función 'saludar' con el parámetro 'nombre' usando la sintaxis `def saludar(nombre):`.";
                return result;
            }

            // 2. Verificar la impresión con concatenación
            if (!/print\s*\(\s*['"]Hola,\s*['"]\s*\+\s*nombre\s*\+\s*['"]!\s*['"]\s*\)/s.test(code)) {
                result.feedback = "La función debe imprimir el saludo exacto: 'Hola, [nombre]!'. Usa la concatenación de strings.";
                return result;
            }

            // 3. Verificar la llamada a la función
            if (!/saludar\s*\(\s*['"]Ana['"]\s*\)/.test(code)) {
                result.feedback = "Debes llamar a la función usando 'saludar(\"Ana\")'.";
                return result;
            }

            return {
                success: true,
                feedback: "¡Perfecto! Has creado y ejecutado una función con un argumento.",
                consoleOutput: "Hola, Ana!"
            };
        }
    },
    {
        id: 9,
        title: "9. Robustez: Manejo de Errores",
        explanation: `El manejo de errores (o excepciones) con <code>try</code> y <code>except</code> permite que tu programa continúe ejecutándose incluso si ocurre un error previsible.

                <p class="mt-3">El código riesgoso va en el bloque <code>try</code>, y la respuesta al error específico (como <code>ZeroDivisionError</code>) va en <code>except</code>.</p>`,
        task: "Escribe un bloque `try` y `except` para manejar una división por cero. En el `try`, intenta dividir **10 / 0**. En el bloque `except ZeroDivisionError`, imprime el mensaje **'Error: División por cero no permitida.'**",
        validation: (code) => {
            const result = { success: false, feedback: "" };

            // 1. Verificar el bloque try con la división
            if (!/try\s*:\s*10\s*\/\s*0/.test(code)) {
                result.feedback = "El bloque 'try' debe contener la operación riesgosa '10 / 0'.";
                return result;
            }

            // 2. Verificar el except con el tipo de error
            if (!/except\s+ZeroDivisionError\s*:/.test(code)) {
                result.feedback = "Debes capturar el error específico usando 'except ZeroDivisionError:'.";
                return result;
            }

            // 3. Verificar el print en el except
            if (!/print\s*\(\s*['"]Error:\s*División\s*por\s*cero\s*no\s*permitida\.["]\s*\)/s.test(code)) {
                result.feedback = "El bloque 'except' debe imprimir el mensaje exacto: 'Error: División por cero no permitida.'";
                return result;
            }

            return {
                success: true,
                feedback: "¡Excelente! Has manejado la excepción con éxito. Tu código es más robusto.",
                consoleOutput: "Error: División por cero no permitida."
            };
        }
    }
];

/**
 * Función para actualizar el estado de bloqueo visual en el sidebar.
 * Muestra un candado (🔒) si la unidad anterior no ha sido completada.
 */
function updateSidebarLockStatus() {
    SCENARIOS.forEach((scenario, index) => {
        const navItem = document.getElementById(`nav-item-${index}`);

        // La unidad 0 (Introducción) siempre está disponible.
        if (index > 0) {
            const isPreviousCompleted = completionStatus[index - 1];

            if (isPreviousCompleted) {
                // Desbloqueado: se puede hacer clic
                navItem.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-red-900/50');
                navItem.classList.add('hover:bg-white/10');
                navItem.innerHTML = `<span class="text-white">${scenario.title}</span>`;
            } else {
                // Bloqueado: no se puede hacer clic, icono de candado
                navItem.classList.add('opacity-50', 'cursor-not-allowed');
                navItem.classList.remove('hover:bg-white/10');
                navItem.innerHTML = `<span class="mr-1" title="Unidad Bloqueada">&#128274;</span> ${scenario.title}`;
            }
        } else {
            // Unidad 0 siempre disponible y con el formato limpio
            navItem.innerHTML = `<span class="text-white">${scenario.title}</span>`;
        }
    });
}

// Función para cargar el escenario actual
function loadScenario(index) {

    const resultsArea = document.getElementById('results-area');
    const feedbackMessage = document.getElementById('feedback-message');
    const nextButton = document.getElementById('next-button');
    const consoleOutputContainer = document.getElementById('console-output-container');
    const consoleOutputEl = document.getElementById('console-output');

    // Lógica de Bloqueo: Si el índice es mayor que 0 y el escenario anterior NO está completado
    if (index > 0 && !completionStatus[index - 1]) {
        const lastCompletedIndex = completionStatus.lastIndexOf(true);
        const goToIndex = lastCompletedIndex === -1 ? 0 : lastCompletedIndex;

        // Muestra un mensaje de bloqueo con el estilo de error
        resultsArea.classList.remove('hidden', 'feedback-success');
        resultsArea.classList.add('feedback-error');
        feedbackMessage.textContent = "¡Unidad Bloqueada! Debes completar el escenario anterior para acceder a este tema.";
        nextButton.classList.add('hidden');
        consoleOutputContainer.classList.add('hidden'); // Ocultar consola en bloqueo

        // Si se intentó navegar directamente a una unidad bloqueada, volvemos a la última completada.
        if (index !== currentScenarioIndex) {
            loadScenario(goToIndex);
        }
        return;
    }

    currentScenarioIndex = index;
    const scenario = SCENARIOS[index];

    // 1. Actualizar Navegación
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.getElementById(`nav-item-${index}`).classList.add('active');

    // 2. Actualizar Contenido
    document.getElementById('topic-title').textContent = scenario.title;
    document.getElementById('theory-section').innerHTML = scenario.explanation;

    // 3. Actualizar Escenario de Práctica
    const taskEl = document.getElementById('task-description');
    const editorEl = document.getElementById('code-editor');
    const runButton = document.getElementById('run-button');

    if (scenario.task) {
        taskEl.innerHTML = scenario.task;
        // Mantener el valor predeterminado si existe, sino limpiarlo
        editorEl.value = (scenario.id === 3 ? "numero = 15\n# Escribe tu código aquí...\n" :
            scenario.id === 4 ? "# Escribe tu código aquí...\n" : // Operaciones aritméticas
                scenario.id === 5 ? "# Escribe tu código aquí...\n" : // Bucle for
                    scenario.id === 6 ? "# Escribe tu código aquí...\n" : // Listas
                        scenario.id === 7 ? "contador = 0\n# Escribe tu código aquí...\n" : // Bucle while
                            scenario.id === 8 ? "# Escribe tu código aquí...\n" : // Funciones
                                scenario.id === 9 ? "# Escribe tu código aquí...\n" : // Manejo de Errores
                                    "");
        editorEl.classList.remove('hidden');
        runButton.classList.remove('hidden');
    } else {
        // Escenario sin tarea (como la introducción)
        taskEl.textContent = scenario.task || "No hay ejercicio en esta unidad.";
        editorEl.value = "";
        editorEl.classList.add('hidden');
        runButton.classList.add('hidden');
    }

    // 4. Limpiar Resultados y Consola
    resultsArea.classList.add('hidden');
    nextButton.classList.add('hidden');
    consoleOutputContainer.classList.add('hidden');


    // 5. Si la unidad ya fue completada, mostrar el botón de siguiente y la salida simulada
    if (completionStatus[index]) {
        resultsArea.classList.remove('hidden', 'feedback-error');
        resultsArea.classList.add('feedback-success');
        feedbackMessage.textContent = "¡Ya has completado este escenario! Puedes pasar al siguiente.";
        nextButton.classList.remove('hidden');

        // Para mostrar la salida anterior, ejecutamos la validación sin código (la salida es estática)
        const completedOutput = SCENARIOS[index].validation({});

        if (completedOutput.consoleOutput) {
            consoleOutputEl.textContent = completedOutput.consoleOutput;
            consoleOutputContainer.classList.remove('hidden');
        }
    }
}

// Función para manejar el botón de Ejecutar/Verificar
function runCode() {
    const code = document.getElementById('code-editor').value;
    const scenario = SCENARIOS[currentScenarioIndex];
    const resultsArea = document.getElementById('results-area');
    const feedbackMessage = document.getElementById('feedback-message');
    const nextButton = document.getElementById('next-button');
    const consoleOutputContainer = document.getElementById('console-output-container');
    const consoleOutputEl = document.getElementById('console-output');

    // Validar el código usando la función específica del escenario
    const validationResult = scenario.validation(code);

    resultsArea.classList.remove('hidden');
    feedbackMessage.textContent = validationResult.feedback;
    nextButton.classList.add('hidden'); // Ocultar por defecto
    consoleOutputContainer.classList.remove('hidden'); // Mostrar el contenedor de la consola

    if (validationResult.success) {
        // Éxito
        resultsArea.classList.remove('feedback-error');
        resultsArea.classList.add('feedback-success');

        // Mostrar salida simulada de la consola
        if (validationResult.consoleOutput) {
            consoleOutputEl.textContent = validationResult.consoleOutput;
        } else {
            consoleOutputEl.textContent = "El código se ejecutó correctamente. No se detectó salida en la consola.";
        }

        // Marcar el escenario como completado y actualizar la interfaz
        completionStatus[currentScenarioIndex] = true;
        updateSidebarLockStatus();

        // Mostrar botón para avanzar
        if (currentScenarioIndex < SCENARIOS.length - 1) {
            nextButton.classList.remove('hidden');
        } else {
            feedbackMessage.textContent += " ¡Has completado todas las unidades iniciales!";
        }

    } else {
        // Error
        resultsArea.classList.remove('feedback-success');
        resultsArea.classList.add('feedback-error');

        // Mostrar el feedback del error en el área de la consola
        consoleOutputEl.textContent = `ERROR de Validación:\n${validationResult.feedback}`;
    }
}

// Función para avanzar al siguiente escenario
function loadNextScenario() {
    const nextIndex = currentScenarioIndex + 1;
    if (nextIndex < SCENARIOS.length) {
        loadScenario(nextIndex);
    } else {
        // Fin de los escenarios
        const resultsArea = document.getElementById('results-area');
        const feedbackMessage = document.getElementById('feedback-message');

        resultsArea.classList.remove('hidden', 'feedback-error');
        resultsArea.classList.add('feedback-success');
        feedbackMessage.textContent = "¡Felicidades! Has completado todos los escenarios iniciales.";
        document.getElementById('next-button').classList.add('hidden');
        document.getElementById('console-output-container').classList.add('hidden');
    }
}

// Función de inicialización
function initApp() {
    const unitList = document.getElementById('unit-list');

    // Inicializar el estado de completado
    // Intenta cargar desde localStorage si existe, sino inicializa a falso.
    const storedCompletionStatus = localStorage.getItem('completionStatus');
    if (storedCompletionStatus) {
        // Se usa el try-catch para manejar errores de JSON.parse
        try {
            completionStatus = JSON.parse(storedCompletionStatus);
            // Asegurar que el array tenga la longitud correcta si se agregaron nuevos escenarios
            while (completionStatus.length < SCENARIOS.length) {
                completionStatus.push(false);
            }
        } catch (e) {
            console.error("Error al parsear completionStatus, reiniciando.", e);
            completionStatus = new Array(SCENARIOS.length).fill(false);
        }
    } else {
        completionStatus = new Array(SCENARIOS.length).fill(false);
    }

    // El primer escenario (Introducción) siempre se considera completado.
    completionStatus[0] = true;

    // Guardar el estado de completado cada vez que se actualiza (ejemplo: en runCode)
    // Agregaremos un listener para guardar el estado antes de la descarga de la página.
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('completionStatus', JSON.stringify(completionStatus));
    });


    // Crear los ítems de navegación
    SCENARIOS.forEach((scenario, index) => {
        const li = document.createElement('li');
        li.className = "mb-2";
        const a = document.createElement('a');
        a.id = `nav-item-${index}`;
        a.href = "#";
        a.textContent = scenario.title;
        a.className = "nav-item block transition duration-150 cursor-pointer";
        a.onclick = (e) => {
            e.preventDefault();
            // Impedir el clic si está bloqueado, excepto para la unidad 0
            if (index > 0 && !completionStatus[index - 1]) {
                return;
            }
            loadScenario(index);
        };
        li.appendChild(a);
        unitList.appendChild(li);
    });

    // Actualizar el estado inicial de bloqueo antes de cargar
    updateSidebarLockStatus();

    // Determinar qué escenario cargar al inicio (el último completado o el siguiente)
    let initialIndex = 0;
    for (let i = 0; i < completionStatus.length; i++) {
        if (completionStatus[i]) {
            initialIndex = i;
        } else {
            // Cargar el primer escenario sin completar
            initialIndex = i;
            break;
        }
    }
    loadScenario(initialIndex);
}

// Iniciar la aplicación al cargar la página
window.onload = initApp;
