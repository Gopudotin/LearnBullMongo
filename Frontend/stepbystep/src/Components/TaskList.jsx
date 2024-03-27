import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../reducers/taskSlice";

const TaskList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(2);

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const status = useSelector((state) => state.task.status);
  const error = useSelector((state) => state.task.error);

  useEffect(() => {
    dispatch(fetchTasks({ page: currentPage, perPage: tasksPerPage }));
  }, [dispatch, currentPage, tasksPerPage]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  // Access tasks.data instead of tasks directly
  const taskData = tasks.data || [];

  if (taskData.length === 0) {
    return <div>No tasks available</div>;
  }

  return (
    <div className="container">
      <h2 className="text-center mb-4">Task List</h2>
      {taskData.map((task) => (
        <div key={task.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{task.name}</h5>
            <p className="card-text">Type: {task.type}</p>
            <p className="card-text">Scheduled Date: {task.scheduledDate}</p>
            <p className="card-text">Current Status: {task.currentStatus}</p>
            <p className="card-text">Error Type: {task.errorType}</p>
            <p className="card-text">
              Error Description: {task.errorDescription}
            </p>
            <p className="card-text">Completion Date: {task.completionDate}</p>
            <p className="card-text">
              Error Occurred Date: {task.errorOccurredDate}
            </p>
            <p className="card-text">Created At: {task.createdAt}</p>
            <p className="card-text">Updated At: {task.updatedAt}</p>
          </div>
        </div>
      ))}
      {/* Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {Array.from(
            { length: Math.ceil(tasks.total / tasksPerPage) },
            (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

export default TaskList;
