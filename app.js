let currentScenarioIndex = 0;
let completionStatus;

const SCENARIOS = [
    {
        id: 0,
        title: "0. Introducción a Python",
        explanation: "Bienvenido al curso de Python.",
        task: "Presiona 'Siguiente Unidad' para comenzar.",
        validation: () => ({
            success: true,
            feedback: "Curso iniciado",
            consoleOutput: "Iniciando..."
        })
    }
    // Puedes pegar aquí el resto de tus escenarios iguales a los originales.
];

function updateSidebarLockStatus() {}

function loadScenario(index) {}

function runCode() {}

function loadNextScenario() {}

function initApp() {
    const runBtn = document.getElementById("run-button");
    const nextBtn = document.getElementById("next-button");

    runBtn.addEventListener("click", runCode);
    nextBtn.addEventListener("click", loadNextScenario);

    completionStatus = new Array(SCENARIOS.length).fill(false);
    completionStatus[0] = true;

    loadScenario(0);
}

window.onload = initApp;
