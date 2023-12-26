import React from 'react';
import './App.css';

import ProjectsSidebar from "./components/ProjectsSidebar";
import ProjectContextProvider from "./store/ProjectContext";
import Content from "./components/Content";

function App(): React.JSX.Element {
    return (
        <ProjectContextProvider>
            <main className="h-screen my-8 flex gap-8">
                <ProjectsSidebar />
                <Content />
            </main>
        </ProjectContextProvider>
    );
}

export default App;