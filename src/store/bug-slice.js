import { createSlice } from '@reduxjs/toolkit';
import { bugsDataURL } from '../ignoreInfo';
//import { useDispatch } from 'react-redux';

const initialBugsState = { bugs: [], isUpdatingBug: false, selectedBug: null };

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

export const getDataFromServer = () => {
  return (dispatch) => {
    const getData = async () => {
      console.log('running getDataFromServer');
      //const dispatch = useDispatch();
      const response = await fetch(`${bugsDataURL}`);

      if (!response.ok) {
        throw new Error('cannot get new bug data from server');
      }

      const data = await response.json();
      console.log(data);

      const bugsList = [];
      //Firebase has a key for each item
      for (const key in data) {
        bugsList.push({
          id: data[key].id,
          title: data[key].title,
          details: data[key].details,
          steps: data[key].steps,
          version: data[key].version,
          priority: data[key].priority,
          assigned: data[key].assigned,
          creator: data[key].creator,
          time: data[key].time,
        });
      }
      console.log(bugsList);
      dispatch(getBugs(bugsList));
    };

    try {
      getData();
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const storeDataToServer = (newBug) => {
  return () => {
    const storeData = async (newBug) => {
      console.log('running storeDataToServer');
      const response = await fetch(`${bugsDataURL}`, {
        method: 'POST',
        body: JSON.stringify(newBug),
        //headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('cannot store new bug');
      }
    };

    try {
      storeData(newBug);
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const storeUpdatedDataToServer = (updatedBugsList) => {
  return () => {
    const storeData = async (updatedBugsList) => {
      //want to replace the whole bugs data, but doesn't work
      console.log('running storeUpdatedDataToServer');
      const response = await fetch(`${bugsDataURL}`, {
        method: 'PUT',
        body: JSON.stringify(updatedBugsList),
        //headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('cannot store new bug');
      }
    };

    try {
      storeData(updatedBugsList);
    } catch (error) {
      console.error(error.message);
    }
  };
};

export default bugSlice.reducer;
export const {
  getBugs,
  addNewBugs,
  updateBugs,
  markComplete,
  deleteBugs,
  storeSelectedBug,
} = bugSlice.actions;
