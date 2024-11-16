// Definición de tipos para Proyectos y Tareas
type TaskStatus = "pending" | "inProgress" | "completed";
// SE DEFINE LA INTERFAS DE LAS TAREAS 

interface Task {
    id: number;
    description: string;
    status: TaskStatus;
    dueDate: Date;
}
// LAS DE LOS PROYECTOS 
interface Project {
    id: number;
    name: string;
    startDate: Date;
    tasks: Task[];
}

// SE CREA UNA PEQUEÑA LISTA PARA LOS PROYECTOS Y PARA LAS TAREAS Y EL DÍA CUANDO INICIA
const projects: Project[] = [
    { id: 1, name: "Project A", startDate: new Date(), tasks: [] },
    { id: 2, name: "Project B", startDate: new Date(), tasks: [] },
];

// SE CREA UNA FUNCIÓN PARA AÑADIR UNA NUEVA TAREA AL PROYECTO 
const addTaskToProject = (projectId: number, task: Task): void => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
        project.tasks.push(task);
    } else {
        console.error(`Project with ID ${projectId} not found.`);
    }
};

// ESTA FUNCIÓN GENERA UN RESUMEN DEL NUEVO ESTADO DE LA TAREA
const generateTaskSummary = (projectId: number): void => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
        const summary = project.tasks.reduce(
            (acc, task) => {
                acc[task.status]++;
                return acc;
            },
            { pending: 0, inProgress: 0, completed: 0 }
        );
        console.log(`Summary for project "${project.name}":`, summary);
    } else {
        console.error(`Project with ID ${projectId} not found.`);
    }
};

// ORDENA LAS TAREAS POR FECHA LIMITE 
const sortTasksByDueDate = (projectId: number): Task[] | null => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
        return [...project.tasks].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
    }
    console.error(`Project with ID ${projectId} not found.`);
    return null;
};

// FUNCIÓN DE ORDEN SUPERIOR QUE FILTRA LAS TAREAS 
const filterTasks = (
    projectId: number,
    filterFunction: (task: Task) => boolean
): Task[] | null => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
        return project.tasks.filter(filterFunction);
    }
    console.error(`Project with ID ${projectId} not found.`);
    return null;
};

// cALCULA EL TIEMPO RESTANTE DE LAS TAAREAS 
const calculateRemainingTime = (projectId: number): number | null => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
        const now = new Date();
        return project.tasks.reduce((acc, task) => {
            if (task.status === "pending") {
                const timeLeft = Math.max(0, (task.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                return acc + timeLeft;
            }
            return acc;
        }, 0);
    }
    console.error(`Project with ID ${projectId} not found.`);
    return null;
};

// ACÁ SE INDENTIDICA LAS TAREAS CRITICAS
const getCriticalTasks = (projectId: number): Task[] | null => {
    return filterTasks(
        projectId,
        (task) => task.status !== "completed" && (task.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) <= 3
    );
};

//CARGA EL RESUMEN DEL PROYECTOS CON UNA SIMULACIÓN DE LA LLAMADA A UNA API
const loadProjectDetails = async (projectId: number): Promise<void> => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${projectId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const project = await response.json();
        console.log("Project details loaded:", project);
    } catch (error) {
        console.error("Error loading project details:", error);
    }
};

// ACÁ UNA FUNCIÍON QUE SIMULA LA ACTUALIACIÓN DE UN ESTADO A UNA API 
const updateTaskStatus = async (
    projectId: number,
    taskId: number,
    newStatus: TaskStatus
): Promise<void> => {
    try {
        console.log(`Simulating status update for task ${taskId} in project ${projectId} to ${newStatus}...`);
        // Simulate server success response
        setTimeout(() => console.log("Status updated successfully!"), 1000);
    } catch (error) {
        console.error("Error updating task status:", error);
    }
};

// ACÁ DE COMO SE USUARÍA. 
addTaskToProject(1, { id: 1, description: "Complete documentation", status: "pending", dueDate: new Date("2024-12-01") });
addTaskToProject(1, { id: 2, description: "Write tests", status: "inProgress", dueDate: new Date("2024-11-20") });
generateTaskSummary(1);
console.log(sortTasksByDueDate(1));
console.log(getCriticalTasks(1));
console.log(calculateRemainingTime(1));
loadProjectDetails(1);
updateTaskStatus(1, 1, "completed");

//7 GRACIAS POR LOS CONOCIMIENTOS PROFE, ESPERO QUE ESTE TODO BIEN NO ME DIO ERROR. 
