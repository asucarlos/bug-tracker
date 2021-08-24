import classes from './BugsList.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
//import { useEffect } from 'react';

import BugItem from '../BugItem/BugItem';
import ModalOverlay from '../../../UI/ModalOverlay';
//import { getBugs } from '../../../store/bug-slice';
//import { getDataFromServer } from '../../../store/bug-slice';

const BugsList = () => {
  const dispatch = useDispatch();
  const { bugs } = useSelector((state) => state.bugs);
  console.log(bugs);
  const { modalOpen } = useSelector((state) => state.ui);

  //const bugsList = dispatch(getDataFromServer());
  //console.log(bugsList);
  // useEffect(() => {
  //   dispatch(getDataFromServer());
  // }, []);

  //eventually move to bug-slice
  let sortedArray = [...bugs];
  if (sortedArray.length > 1) {
    sortedArray.sort((a, b) => Number(a.priority) - Number(b.priority));
  }

  //PROBLEM: old data shown on the list

  return (
    <React.Fragment>
      <div className={classes.container}>
        <h1>All Bugs</h1>
        <ul className={classes['list-container']}>
          <li className={classes.labels}>
            <p key='title'>Title</p>
            <p key='version'>Version</p>
            <p key='priority'>Priority</p>
            <p key='assigned'>Assigned</p>
            <p key='creator'>Creator</p>
            <div className={classes.actions}>
              <p>Edit</p>
              <p>Delete</p>
            </div>
          </li>
          {sortedArray.length >= 1 &&
            sortedArray.map((bug) => (
              <BugItem
                className={classes.items}
                key={bug.id}
                id={bug.id}
                bug={bug}
              />
            ))}
          {sortedArray.length === 0 && (
            <p className={classes.error}>No bugs found.</p>
          )}
        </ul>
      </div>
      {modalOpen && <ModalOverlay />}
    </React.Fragment>
  );
};

export default BugsList;
