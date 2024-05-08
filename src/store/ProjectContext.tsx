import React, {createContext, useReducer} from "react";

interface ProjectsState {
    selectedProjectId: undefined | null | number,
    projects: Array<Project>
    tasks: Array<Task>
}

const INITIAL_PROJECTS_STATE: ProjectsState = {
    selectedProjectId: undefined,
    projects: [],
    tasks: []
}

export type StringOrUndefined = string | undefined;

export type Project = {
    title: StringOrUndefined,
    description: StringOrUndefined,
    dueDate: StringOrUndefined,
    id?: number
}

export type Task = {
    text: string | undefined,
    projectId: undefined | null | number,
    id: number
}

export const ProjectContext: React.Context<any> = createContext({
    projects: {},
    onDelete: () => {},
    onAddTask: () => {},
    onDeleteTask: () => {},
    tasks: []
});

interface ProjectContextProviderProps {
    children?: React.ReactNode
}

interface Action {
    type: string
    payload?: Payload
}

interface Payload {
    id?: number | undefined,
    dataProject?: Project,
    textTask?: string
}

function projectsReducer(state: ProjectsState, action: Action): any {
    if (action.type === 'CLICK_ADD_PROJECT') {
        return {
            ...state,
            selectedProjectId: null
        };
    }

    if (action.type === 'SELECT_PROJECT') {
        return {
            ...state,
            selectedProjectId: action.payload?.id
        };
    }

    if (action.type === 'CLICK_CANCEL') {
        return {
            ...state,
            selectedProjectId: undefined
        };
    }

    if (action.type === 'CREATE_NEW_PROJECT') {
        const projectId: number = Math.random();
        const newProject = {
            ...action.payload?.dataProject,
            id: projectId
        }

        return {
            ...state,
            selectedProjectId: projectId,
            projects: [
                ...state.projects,
                newProject
            ]
        }
    }

    if (action.type === 'DELETE_PROJECT') {
        return {
            ...state,
            selectedProjectId: undefined,
            projects: state.projects.filter((project: Project) =>
                project.id !== state.selectedProjectId)
        };
    }

    if (action.type === 'ADD_TASK') {
        const taskId: number = Math.random()
        const newTask: Task = {
            text: action.payload?.textTask,
            projectId: state.selectedProjectId,
            id: taskId
        }

        return {
            ...state,
            tasks: [
                newTask, ...state.tasks
            ]
        }
    }

    if (action.type === 'DELETE_TASK') {
        return {
            ...state,
            tasks: state.tasks.filter((task: Task) => task.id !== action.payload?.id)
        }

    }

    return state
}

export default function ProjectContextProvider({children}: ProjectContextProviderProps): React.JSX.Element {

    const [projectsStateNew, projectsDispatch]: [ProjectsState, React.Dispatch<Action>]
        = useReducer(projectsReducer, INITIAL_PROJECTS_STATE)

    function handleClickAddProject(): void {
        projectsDispatch({
            type: "CLICK_ADD_PROJECT"
        })
    }

    function handleSelectProject(id: number | undefined): void {
        projectsDispatch({
            type: 'SELECT_PROJECT',
            payload: {
                id: id
            }
        })
    }

    function handleClickCancel(): void {
        projectsDispatch({
            type: 'CLICK_CANCEL'
        })
    }

    function handleCreateNewProject(dataProject: Project): void {
        projectsDispatch({
            type: 'CREATE_NEW_PROJECT',
            payload: {
                dataProject: dataProject
            }
        })
    }

    function handleDeleteProject(): void {
        projectsDispatch({
            type: 'DELETE_PROJECT'
        })
    }

    function handleAddTask(textTask: string): void {
        projectsDispatch({
            type: 'ADD_TASK',
            payload: {
                textTask: textTask
            }
        })
    }


    function handleDeleteTask(id: number): void {
        projectsDispatch({
            type: 'DELETE_TASK',
            payload: {
                id: id
            }
        })
    }

    const selectedProject: Project | undefined = projectsStateNew.projects.find(
        (project => project.id === projectsStateNew.selectedProjectId))

    const projectContextValue = {
        projects: projectsStateNew.projects,
        selectedProjectId: projectsStateNew.selectedProjectId,
        tasks: projectsStateNew.tasks,
        onStartAddProject: handleClickAddProject,
        onStartNewProject: handleCreateNewProject,
        onCancelClicked: handleClickCancel,
        onSelectProject: handleSelectProject,
        onDelete: handleDeleteProject,
        onAddTask: handleAddTask,
        onDeleteTask: handleDeleteTask,
        selectedProject: selectedProject
    }
    console.log(projectsStateNew)


    return (
        <ProjectContext.Provider value={projectContextValue}>
            {children}
        </ProjectContext.Provider>
    )
}