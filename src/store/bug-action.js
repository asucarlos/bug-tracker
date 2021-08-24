// export const getDataFromServer = () => {
//   //const [isGetting, setIsGetting] = useState(false);
//   return (dispatch) => {
//     const getData = async () => {
//       console.log('running getDataFromServer');
//       //const dispatch = useDispatch();
//       const response = await fetch(`${bugsDataURL}`);

//       if (!response.ok) {
//         throw new Error('cannot get new bug data from server');
//       }

//       const data = await response.json();
//       console.log(data);

//       const bugsList = [];
//       //Firebase has a key for each item
//       for (const key in data) {
//         bugsList.push({
//           id: data[key].id,
//           title: data[key].title,
//           details: data[key].details,
//           steps: data[key].steps,
//           version: data[key].version,
//           priority: data[key].priority,
//           assigned: data[key].assigned,
//           creator: data[key].creator,
//           time: data[key].time,
//         });
//       }
//       console.log(bugsList);
//       dispatch(getBugs(bugsList));
//     };

//     try {
//       getData();
//     } catch (error) {
//       console.error(error.message);
//     }
//   };
// };

export const storeDataToServer = (newBug) => {
  return () => {
    const storeData = async (newBug) => {
      console.log('running storeDataToServer');
      const response = await fetch(`${bugsDataURL}`, {
        method: 'POST',
        body: JSON.stringify({
          id: `${new Date().getTime()}${newBug.title}`,
          title: newBug.title,
          details: newBug.details,
          steps: newBug.steps,
          version: newBug.version,
          priority: newBug.priority,
          assigned: newBug.assigned,
          creator: newBug.creator,
          time: new Date().getTime(),
        }),
        headers: { 'Content-Type': 'application/json' },
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
      //const bugsObject = for()
      //want to replace the whole bugs data, but doesn't work
      console.log('running storeUpdatedDataToServer');
      console.log(updatedBugsList);
      const response = await fetch(`${bugsDataURL}`, {
        method: 'PUT',
        //format for updatedBugsList is not right...?
        body: JSON.stringify(updatedBugsList),
        //body: JSON.stringify({ key: {} }),
        headers: { 'Content-Type': 'application/json' },
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
