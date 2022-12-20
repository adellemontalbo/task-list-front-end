import PropTypes from 'prop-types';
import React from 'react';

import './Task.css';

const Task = (props) => {
  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => props.onTaskComplete(props.id)}
      >
        {props.title}
      </button>
      <button className="tasks__item__remove button" onClick={() => props.onDelete(props.id)}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onTaskComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
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
