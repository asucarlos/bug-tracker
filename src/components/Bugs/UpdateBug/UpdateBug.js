import classes from './UpdateBug.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';

import { updateBugs } from '../../../store/bug-slice';
import useBugInput from '../../../hooks/useBugInput';
import Button from '../../../UI/Button';

const EditBug = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const { bugs } = useSelector((state) => state.bugs);
  const selectedBug = bugs.find((bug) => bug.id === params.bugId);

  const {
    enteredValue: enteredTitle,
    valueChangeHandler: titleChangeHandler,
    resetValueHandler: resetTitle,
  } = useBugInput(selectedBug.title);

  const {
    enteredValue: enteredDetails,
    valueChangeHandler: detailsChangeHandler,
    resetValueHandler: resetDetails,
  } = useBugInput(selectedBug.details);

  const {
    enteredValue: enteredSteps,
    valueChangeHandler: stepsChangeHandler,
    resetValueHandler: resetSteps,
  } = useBugInput(selectedBug.steps);

  const {
    enteredValue: enteredVersion,
    valueChangeHandler: versionChangeHandler,
    resetValueHandler: resetVersion,
  } = useBugInput(selectedBug.version);

  const {
    enteredValue: enteredPriority,
    valueChangeHandler: priorityChangeHandler,
    resetValueHandler: resetPriority,
  } = useBugInput(selectedBug.priority);

  const {
    enteredValue: enteredAssigned,
    valueChangeHandler: assignedChangeHandler,
    resetValueHandler: resetAssigned,
  } = useBugInput(selectedBug.assigned);

  const {
    enteredValue: enteredCreator,
    valueChangeHandler: creatorChangeHandler,
    resetValueHandler: resetCreator,
  } = useBugInput(selectedBug.creator);

  const submitUpdatedBugHandler = (e) => {
    e.preventDefault();

    const enteredTime = new Date().getTime();
    const enteredId = selectedBug.id;

    const newBug = {
      title: enteredTitle,
      details: enteredDetails,
      steps: enteredSteps,
      version: enteredVersion,
      priority: enteredPriority,
      assigned: enteredAssigned,
      creator: enteredCreator,
      time: enteredTime,
      id: enteredId,
    };

    dispatch(updateBugs(newBug));
    history.push('/bug-tracker/bugs-list');

    resetTitle();
    resetDetails();
    resetSteps();
    resetVersion();
    resetPriority();
    resetAssigned();
    resetCreator();
  };

  return (
    <div className={classes.container}>
      <h1>Update Bug</h1>
      <form className={classes['bug-form']} onSubmit={submitUpdatedBugHandler}>
        <div className={classes['add-bug-form']}>
          <div className={classes['add-bug-input']}>
            <label>Title</label>
            <input
              type='text'
              placeholder='enter title'
              onChange={titleChangeHandler}
              value={enteredTitle}
            />
          </div>
          <div className={classes['add-bug-textarea']}>
            <label>Details</label>
            <textarea
              type='text'
              placeholder='enter details'
              onChange={detailsChangeHandler}
              value={enteredDetails}
            />
          </div>
          <div className={classes['add-bug-textarea']}>
            <label>Steps</label>
            <textarea
              type='text'
              placeholder='enter steps'
              onChange={stepsChangeHandler}
              value={enteredSteps}
            />
          </div>
          <div className={classes['add-bug-input']}>
            <label>Version</label>
            <input
              type='text'
              placeholder='enter version'
              onChange={versionChangeHandler}
              value={enteredVersion}
            />
          </div>
          <div className={classes['add-bug-input']}>
            <label>Priority</label>
            <select onChange={priorityChangeHandler} value={enteredPriority}>
              <option value='1'>High</option>
              <option value='2'>Mid</option>
              <option value='3'>Low</option>
            </select>
          </div>
          <div className={classes['add-bug-input']}>
            <label>Assigned</label>
            <input
              type='text'
              placeholder='enter assigned person'
              onChange={assignedChangeHandler}
              value={enteredAssigned}
            />
          </div>
          <div className={classes['add-bug-input']}>
            <label>Creator</label>
            <input
              type='text'
              placeholder='enter creator'
              onChange={creatorChangeHandler}
              value={enteredCreator}
            />
          </div>
        </div>
        <Button
          type='submit'
          disabled={false}
          className={classes['update-bug-btn']}
          text='Save updated bug'
        />
      </form>
    </div>
  );
};

export default EditBug;
