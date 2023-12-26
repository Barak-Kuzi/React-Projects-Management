import React, {SetStateAction, useContext, useState} from "react";
import {ProjectContext} from "../store/ProjectContext";

export interface NewTaskProps {
    onAddTask: (textTask: string) => void
}

export default function NewTask(): React.JSX.Element {

    const {onAddTask} = useContext(ProjectContext);

    const [enteredTask, setEnteredTask]: [string, React.Dispatch<SetStateAction<string>>]
        = useState('');

    function handleChangeState(event: React.ChangeEvent<HTMLInputElement>): void {
        setEnteredTask(event.target.value);
    }

    function handleClickAdd(): void {
        if (enteredTask.trim() === '')
            return;

        onAddTask(enteredTask);
        setEnteredTask('');
    }

    return (
        <div className="flex items-center justify-between">
            <input
                className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                type="text"
                value={enteredTask}
                onChange={handleChangeState}
            />
            <button
                className="text-stone-700 hover:text-red-500"
                onClick={handleClickAdd}
            >
                Add Task
            </button>
        </div>
    );
}