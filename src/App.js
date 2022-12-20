import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

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

const taskCompleteApi = (id) => {
  return axios
    .patch(`${kBaseUrl}/${id}/mark_complete`)
    .then((response) => {
      return convertFromApi(response.data);
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

  // const taskCompleteApi = (id) => {
  //   return axios.patch(`${kBaseUrl}/tasks/${id}/mark_complete`)
  //   .then(response => {
  //     return convertFromApi(response.data);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // };

  const taskComplete = (id) => {
    return taskCompleteApi(id).then((taskResult) => {
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
      // setCatData(catData => catData.filter(cat => {
      //   return cat.id !== catResult.id;
      // }));
      return getAllTasks();
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
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
