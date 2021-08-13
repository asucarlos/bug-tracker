import classes from './BugItem.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

import { BiEdit } from 'react-icons/bi';
import { BsTrashFill } from 'react-icons/bs';

const BugItem = (props) => {
  return (
    <div className={classes['bug-item']}>
      <Link className={classes.link} to={`/bugs-list/${props.id}`}>
        <li
          className={classes['bug-detail']}
          key={props.bug.id}
          bug={props.bug}
        >
          <p>{props.bug.title}</p>
          <p>{props.bug.version}</p>
          <p>{props.bug.priority}</p>
          <p>{props.bug.assigned}</p>
          <p>{props.bug.creator}</p>
        </li>
      </Link>
      <div className={classes.actions}>
        <BiEdit className={classes.icon} size='25px' color='green' />
        <BsTrashFill className={classes.icon} size='25px' color='red' />
      </div>
    </div>
  );
};

export default BugItem;