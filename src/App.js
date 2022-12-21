import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import NewTaskForm from './components/NewTaskForm.js';

const kBaseUrl = 'https://task-list-api-c17.herokuapp.com/tasks';

const convertFromApi = (apiTask) => {
  const { is_complete: isComplete, id, description, title } = apiTask;
  const newTask = { isComplete, id, description, title };
  return newTask;
};

const getAllTasksApi = () => {
  return axios
    .get(`${kBaseUrl}`)
    .then((response) => {
      return response.data.map(convertFromApi);
    })
    .catch((err) => {
      console.log(err);
    });
};

const taskCompleteApi = (id, currentStatus) => {
  const endPoint = currentStatus ? 'mark_incomplete' : 'mark_complete';
  return axios
    .patch(`${kBaseUrl}/${id}/${endPoint}`)
    .then((response) => {
      return convertFromApi(response.data.task);
    })
    .catch((error) => {
      console.log(error);
    });
};

const unregisterTaskApi = (id) => {
  return axios
    .delete(`${kBaseUrl}/${id}`)
    .then((response) => {
      return convertFromApi(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const addNewTaskApi = (formData) => {
  const requestBody = { ...formData };

  return axios
    .post(`${kBaseUrl}`, requestBody)
    .then((response) => {
      return convertFromApi(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const App = () => {
  const [tasksData, setTasksData] = useState([]);

  const getAllTasks = () => {
    return getAllTasksApi().then((tasks) => {
      // console.log(cats);
      setTasksData(tasks);
    });
  };

  useEffect(() => {
    // data fetching code
    getAllTasks();
  }, []);

  const taskComplete = (id, currentStatus) => {
    return taskCompleteApi(id, currentStatus).then((taskResult) => {
      setTasksData((taskData) =>
        taskData.map((task) => {
          if (task.id === taskResult.id) {
            return taskResult;
          } else {
            return task;
          }
        })
      );
    });
  };

  const unregisterTask = (id) => {
    return unregisterTaskApi(id).then((taskResult) => {
      return getAllTasks();
    });
  };

  const handleTaskSubmit = (data) => {
    addNewTaskApi(data)
      .then((newTask) => {
        setTasksData([...tasksData, newTask]);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <NewTaskForm handleTaskSubmit={handleTaskSubmit} />
        <TaskList
          tasks={tasksData}
          onTaskComplete={taskComplete}
          onDelete={unregisterTask}
        />
      </main>
    </div>
  );
};

export default App;
