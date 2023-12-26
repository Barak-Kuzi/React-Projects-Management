import React, {useContext} from "react";
import NewTask from "./New Task";
import {ProjectContext, Task} from "../store/ProjectContext";
import TaskListItem from "./TaskListItem"

export default function Tasks(): React.JSX.Element {

    const {tasks, selectedProjectId} = useContext(ProjectContext)

    function handleTasksProject(projectId: number): Array<Task> {
        return tasks.filter((task: Task) => projectId === task.projectId)
    }

    const tasksSelectedProject: Array<Task> = handleTasksProject(selectedProjectId)

    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask  />
            {tasksSelectedProject.length < 1 ?
                (<p className="text-stone-800 my-4">This project does not have any tasks.</p>) :
                (<ul className="p-4 mt-8 rounded-md bg-stone-100">
                    {tasksSelectedProject.map((task: Task) => (
                        <TaskListItem task={task} key={task.id} />
                    ))}
                </ul>
            )}
        </section>
    );
}