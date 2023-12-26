import React, {useContext} from "react";
import {Project, ProjectContext} from "../store/ProjectContext";

interface ProjectListProps {
    project: Project
}
export default function ProjectListItem({project}: ProjectListProps):React.JSX.Element {

    const {selectedProjectId, onSelectProject} = useContext(ProjectContext)

    function handleClick() {
        onSelectProject(project.id)
    }

    let cssClasses: string = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200" +
        " hover:bg-stone-800"

    if (project.id === selectedProjectId) {
        cssClasses += " bg-stone-800 text-stone-200"
    } else {
        cssClasses += " text-stone-400"
    }

    return (
        <li key={project.id} className="flex justify-between my-4">
            <button
                className={cssClasses}
                onClick={handleClick}
            >
                {project.title}
            </button>
    </li>);
}