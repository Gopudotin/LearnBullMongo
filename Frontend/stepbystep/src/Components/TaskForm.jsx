import React, { useState } from 'react';

const TaskForm = () => {
  const [taskData, setTaskData] = useState({
    name: '',
    type: '',
    scheduledDate: '',
    currentStatus: 'pending',
    errorType: '',
    errorDescription: '',
    completionDate: null,
    errorOccurredDate: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (response.ok) {
        console.log('Task created successfully!');
        // Reset the form fields after successful submission
        setTaskData({
          name: '',
          type: '',
          scheduledDate: '',
          currentStatus: 'pending',
          errorType: '',
          errorDescription: '',
          completionDate: null,
          errorOccurredDate: null
        });
      } else {
        console.error('Failed to create task:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred while creating task:', error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4">
        <h2 className="text-center mb-4">Task Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={taskData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Type:</label>
            <input
              type="text"
              className="form-control"
              name="type"
              value={taskData.type}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Scheduled Date:</label>
            <input
              type="datetime-local"
              className="form-control"
              name="scheduledDate"
              value={taskData.scheduledDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;