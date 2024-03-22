import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './Components/TaskList';
import TaskForm from './Components/TaskForm';

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskForm />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;














/*import React from 'react';
import ReactPaginate from 'react-paginate';
import TaskForm from "./Components/TaskForm";

function App() {

  const handlePageClick = (data) => {
    console.log(data.selected);
  }

  return (
    <div>
      <TaskForm/>
    </div>
  );
}

export default App;

/*App.js 
import React from 'react'; 
import {BrowserRouter,Routes,Route} from "react-router-dom";
import TaskListPage from './Components/TaskListPage'; 
import TaskForm from './Components/TaskForm'; 
const App = () => { return ( 
  <BrowserRouter> 
  <Routes> 
    <Route path="/" element={TaskForm} /> 
    <Route path="/tasks" element={TaskListPage} /> 
  </Routes>
  </BrowserRouter>
   ); 
  }; 
  export default App;
*/