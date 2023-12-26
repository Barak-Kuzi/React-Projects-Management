import React, {useContext} from "react";
import SelectedProject from "./SelectedProject";
import NewProject from "./NewProject";
import NoProjectSelected from "./NoProjectSelected";
import {ProjectContext} from "../store/ProjectContext";

export default function Content(): React.JSX.Element {
    const {selectedProject, selectedProjectId} = useContext(ProjectContext);

    let content: React.JSX.Element = selectedProject ? (
        <SelectedProject />) : <></>

    if (selectedProjectId === null) {
        content = <NewProject  />
    } else if (selectedProjectId === undefined) {
        content = <NoProjectSelected />
    }

    return (content);
}