import logo from './logo.svg';
import './style/App.css';
import './style/Navbar.css';
import Navbar from "./Navbar";
import Header from "./Header";
import {useState} from "react";

function App() {
    const [component, setComponent] = useState('All')
    const changeComponent = (newComponent) => setComponent(newComponent)
  return (
      <div>
    <div className="App">
        <Header/>
    </div>
          <div className='dynamic-component-container'>
              <Navbar change={changeComponent}/>
              {renderDynamicComponent(component)}
          </div>
      </div>
  );
}
function renderDynamicComponent(component){
    switch (component){
        case 'All':
            return(<p>test1</p>)
        case 'Latest':
            return (<p>test2</p>)
        case 'Projects':
            return (<p>test3</p>)
        case 'Settings':
            return (<p>test4</p>)
    }
}
export default App;
