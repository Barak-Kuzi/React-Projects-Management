import React, {useContext} from "react"
import Tasks from "./Tasks";
import { ProjectContext } from "../store/ProjectContext"

export default function SelectedProject(): React.JSX.Element {
    // const formattedDate = new Date(project.dueDate)
    const {selectedProject, onDelete} = useContext(ProjectContext)

    return (
        <div className="w-[35rem] mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">{selectedProject.title}</h1>
                    <button
                        className="text-stone-600 hover:text-stone-950"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
                <p className="mb-4 text-stone-400">{selectedProject.dueDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">{selectedProject.description}</p>
            </header>
            <Tasks />
        </div>
    );
}