import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage/landing';
import Home from './components/Home/Home';
import CreatePoke from './components/CreatePoke/createPoke';
import details from './components/Detail/detail';


function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path= '/' component= {LandingPage}/>
        <Route path ='/home' component= {Home}/>
        <Route path = '/createpokemon' component= {CreatePoke}/>
        <Route path = '/home:id' component={details} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;


