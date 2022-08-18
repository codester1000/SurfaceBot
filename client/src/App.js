import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Board'
import DashboardNavbar from './components/Navbar'
import './App.css';


function App() {
  return (
    <div>
      {/* <Routes> */}
        {/* <Route path='/' element= { */}
          <div>
            <DashboardNavbar />
            <Dashboard />
          </div>
        {/* }/> */}
      {/* </Routes> */}
    </div>
  );
}

export default App;
