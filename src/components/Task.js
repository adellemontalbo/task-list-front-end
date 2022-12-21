import PropTypes from 'prop-types';
import React from 'react';

import './Task.css';

const Task = (props) => {
  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => props.onTaskComplete(props.id, props.isComplete)}
      >
        {props.title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => props.onDelete(props.id)}
      >
        x
      </button>
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
