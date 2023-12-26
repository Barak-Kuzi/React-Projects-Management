import React, {useContext} from "react";
import {ProjectContext, Task} from "../store/ProjectContext";

interface TaskListItemProps {
    task: Task
}

export default function TaskListItem({task}: TaskListItemProps): React.JSX.Element {

    const {onDeleteTask} = useContext(ProjectContext)

    function handleClickClear(): void {
        onDeleteTask(task.id)
    }

    return (
        <li className="flex justify-between my-4" key={task.id}>
            <span>{task.text}</span>
            <button
                className="text-stone-700 hover:text-red-500"
                onClick={handleClickClear}
            >
                Clear
            </button>
        </li>
    );
}