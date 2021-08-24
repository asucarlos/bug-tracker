import { createSlice } from '@reduxjs/toolkit';
//import { useState } from 'react';
import { bugsDataURL } from '../ignoreInfo';
//import { useDispatch } from 'react-redux';

const initialBugsState = {
  bugs: [],
  isUpdatingBug: false,
  selectedBug: null,
  // storageComplete: false
};

const bugSlice = createSlice({
  name: 'bug',
  initialState: initialBugsState,
  reducers: {
    getBugs(state, action) {
      const bugsList = action.payload;
      state.bugs = bugsList;
      //sort bugs here
    },

    addNewBugs(state, action) {
      //const dispatch = useDispatch();
      state.isUpdatingBug = false;
      const newBug = action.payload;

      const existingItem = state.bugs.find((bug) => bug.id === newBug.id);

      if (!existingItem) {
        state.bugs.push({
          id: newBug.id,
          title: newBug.title,
          details: newBug.details,
          steps: newBug.steps,
          version: newBug.version,
          priority: newBug.priority,
          assigned: newBug.assigned,
          creator: newBug.creator,
          time: newBug.time,
        });
        console.log(state.bugs);
        //storeDataToServer(newBug);
      }
    },

    updateBugs(state, action) {
      //const dispatch = useDispatch();
      state.isUpdatingBug = true;
      state.selectedBug = action.payload;
      const existingItem = state.bugs.find(
        (bug) => bug.id === state.selectedBug.id
      );
      const existingItemIndex = state.bugs.indexOf(existingItem);

      const bugUpdate = {
        id: existingItem.id,
        title: state.selectedBug.title,
        details: state.selectedBug.details,
        steps: state.selectedBug.steps,
        version: state.selectedBug.version,
        priority: state.selectedBug.priority,
        assigned: state.selectedBug.assigned,
        creator: state.selectedBug.creator,
        time: state.selectedBug.time,
      };

      if (existingItem) {
        state.bugs.splice(existingItemIndex, 1, bugUpdate);
        console.log(state.bugs);
      }

      state.isUpdatingBug = false;
      state.selectedBug = null;
    },
    markComplete() {},
    deleteBugs(state, action) {
      state.selectedBug = action.payload;
      const existingItem = state.bugs.find(
        (bug) => bug.id === state.selectedBug.id
      );
      const existingItemIndex = state.bugs.indexOf(existingItem);

      if (existingItem) {
        state.bugs.splice(existingItemIndex, 1);
      }

      state.selectedBug = null;
    },
    storeSelectedBug(state, action) {
      state.selectedBug = action.payload;
    },
  },
});



export default bugSlice.reducer;
export const {
  getBugs,
  addNewBugs,
  updateBugs,
  markComplete,
  deleteBugs,
  storeSelectedBug,
} = bugSlice.actions;
