import logo from './logo.svg';
import './App.css';
import React from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          :)
        </p>
        <AdminProjectList/>
      </header>
    </div>
  );
}

class AdminProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("/admin/projects/")
        .then(res => {
          console.log(res);
          return res.json()
        })
        .then(
            (result) => {
                //console.log(result)
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <ul>
              {items.map(item => (
                  <li key={item.id}>
                      {item.name}
                  </li>
              ))}
          </ul>
      );
    }
  }
}

export default App;