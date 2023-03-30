import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route,} from 'react-router-dom';
import Home from './Components/Home';
import './App.css';
import History from './Components/History';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Routes>
            <Route path='/' element={ <Home/> }></Route>
            <Route exact path='/history' element={ <History/> }></Route>
            {/* <Route exact path='/card' element={ <Card/> }></Route> */}
          
        </Routes>
        </div>
      </Router>
    );
  }
}
  
export default App;
