import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  // const [complete, setComplete] = useState(isComplete);
  // const buttonClass = complete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => setComplete((complete) => !complete)}
      >
        {props.title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
};

export default Task;

// const Task = (props) => {
//   const [complete, setComplete] = useState(props.isComplete);
//   const buttonClass = complete ? 'tasks__item__toggle--completed' : '';

//   return (
//     <li className="tasks__item">
//     <h1>Title: {props.title} </h1>
//     <h2>Id: {props.id} </h2>
//       <button
//         className={`tasks__item__toggle ${buttonClass}`}
//         onClick={() => setComplete(!complete)}
//       >
//       </button>
//       <button className="tasks__item__remove button">x</button>
//     </li>
//   );
// };
