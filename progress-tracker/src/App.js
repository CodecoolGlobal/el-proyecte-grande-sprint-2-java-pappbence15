import './style/App.css';
import './style/Navbar.css';
import './style/Header.css'
import './style/Footer.css'
import './style/Settings.css';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import './style/DarkMode.css'
import {useEffect, useState} from "react";
import ProjectList from "./components/ProjectList";
import ProjectAdminView from "./components/ProjectAdminView";
import Settings from "./Settings";
import ProjectCreateBlock from "./components/ProjectCreateBlock";

function App() {
    const [component, setComponent] = useState('All')
    const [projectId, setProjectId] = useState('')
    const [darkMode, setDarkMode] = useState(true);
    const setTheme = (mode) => setDarkMode(mode);
    const changeComponent = (newComponent) => setComponent(newComponent)
    const changeProjectId = (newId) => setProjectId(newId)
    let backgroundColor;

    if(darkMode){
        backgroundColor = "dark-mode-background";
    }else{
        backgroundColor = 'light-mode-background';
    }

    useEffect(() => getThemeSetting(setDarkMode), [])

  return (
      <div className={backgroundColor} id='main-div'>
    <div className="App">
        <Header name={"Name of the Brand"} changeComponent={changeComponent}/>
        <Footer owner={"©Hello World KFT"} creators={["csillalukacs", "Sjpeti97", "pappbence15", "JustBenS1"]} links={['https://github.com/csillalukacs', "https://github.com/Sjpeti97", "https://github.com/pappbence15", "https://github.com/JustBenS1"]}/>
    </div>
          <div className='dynamic-component-container'>
              {renderDynamicComponent(component, changeComponent, projectId, changeProjectId, setTheme, darkMode)}
          </div>
      </div>
  );
}

function renderDynamicComponent(component, changeComponent, projectId, changeProject, setTheme, darkMode){
    switch (component){
        case 'All':
            if (projectId) {
                return (<ProjectAdminView projectId={projectId}
                                          detailedView={true}
                />)
            } else {
                return (<ProjectList userType={"admin"}
                                     changeComponent={changeComponent}
                                     changeProject={changeProject}
                                     projectId={projectId}

                />)
            }
        case 'Latest':
            if (projectId) {
                return (<ProjectAdminView projectId={projectId}
                                          detailedView={false}

                />)
            } else {
                return (<ProjectList userType={"admin"}
                                     changeComponent={changeComponent}
                                     changeProject={changeProject}
                                     projectId={projectId}
                />)
            }
        case 'Projects':
            return (<ProjectList userType={"admin"}
                                 changeComponent={changeComponent}
                                 changeProject={changeProject}
                                 projectId={projectId}
            />)
        case 'Settings':
            return <Settings setTheme={setTheme} darkMode={darkMode}/>
        case 'Create_Project':
            return(
                <ProjectCreateBlock
                    userType = {"admin"}
                    changeComponent = {changeComponent}
                />
            ) //this will be the create project page's caller*/
    }
}

function getThemeSetting(setTheme){
    fetch("/settings/darkMode")
        .then(res => res.json())
        .then(result => {
            console.log(result)
            setTheme(result)
        })
}

export default App;
