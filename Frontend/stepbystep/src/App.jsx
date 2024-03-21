import React from 'react';
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
