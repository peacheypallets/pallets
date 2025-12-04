import './App.css';
import JobGrid from './features/JobTable/JobGrid.jsx';
import Navbar from './components/Navbar.jsx';


function App() {






  return (
    <div className="App flex flex-col justify-center content-between p-2 w-full">
      <Navbar/>
      <JobGrid/>
    </div>
  );
}

export default App;
