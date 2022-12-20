import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasksData, setTasksData] = useState(TASKS);

  const taskDataUpdater = (tasksData, id) =>
    tasksData.map((task) => taskUpdater(task, id));

  const taskUpdater = (task, id) => {
    if (task.id === id) {
      return { ...task, isComplete: !task.isComplete };
    } else {
      return task;
    }
  };

  const taskComplete = (id) => {
    setTasksData((tasksData) => taskDataUpdater(tasksData, id));
  };

  const deleteTask = (id) => {
    setTasksData((tasksData) =>
      tasksData.filter((task) => {
        return task.id !== id;
      })
    );
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
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
};

export default App;
