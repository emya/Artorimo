const initialState = {
  isSubmissionSucceeded: null,
};

export default function profile(state=initialState, action) {
  //let profileList = state.slice();

  switch (action.type) {
    case 'FETCH_COMMUNITY_POSTS':
      return {...state, communityPosts: action.data};

    case 'POSTED_COMMUNITY':
      return {...state, isSubmissionSucceeded: true};


    default:
      return state;
  }
}