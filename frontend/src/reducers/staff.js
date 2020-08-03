const initialState = {
  isSubmissionSucceeded: null,
  isEmagazineSubmissionSucceeded: null,
  emagazines: null,
};

export default function profile(state=initialState, action) {
  //let profileList = state.slice();

  switch (action.type) {
    case 'SENT_EMAILS':
      //profileList.splice(0, 1, action.profile);
      return {...state, isSubmissionSucceeded: true};

    case 'FETCH_EMAGAZINES':
      return {...state, emagazines: action.data.emagazines};

    case 'SENT_EMAGAZINES':
      return {...state, isEmagazineSubmissionSucceeded: true};


    default:
      return state;
  }
}