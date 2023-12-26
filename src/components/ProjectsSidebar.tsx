import React, {useContext} from "react";
import Button from "./Button";

import {ProjectContext, Project} from "../store/ProjectContext"

import ProjectListItem from "./ProjectListItem";

export default function ProjectsSidebar(): React.JSX.Element {
    const {onStartAddProject, projects} = useContext(ProjectContext);

    return (
        <>
            <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
                <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
                <div>
                    <Button onClick={onStartAddProject}>+ Add Project</Button>
                </div>
                <ul className="mt-8">
                    {projects.map((project: Project) => {
                        return (<ProjectListItem project={project} key={project.id} />)
                        }
                    )}
                </ul>
            </aside>
        </>
    );
}