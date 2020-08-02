const initialState = {
  isSubmissionSucceeded: null,
};

export default function profile(state=initialState, action) {
  //let profileList = state.slice();

  switch (action.type) {
    case 'SENT_EMAILS':
      //profileList.splice(0, 1, action.profile);
      return {...state, isSubmissionSucceeded: true};

    default:
      return state;
  }
}