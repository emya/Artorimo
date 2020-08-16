const initialState = {
  isSubmissionSucceeded: null,
};

export default function profile(state=initialState, action) {
  //let profileList = state.slice();

  switch (action.type) {
    case 'FETCH_COMMUNITY_POSTS':
      return {...state, communityPosts: action.data};

    case 'FETCH_COMMUNITY_POST':
      console.log(action.data);
      return {...state, communityPost: action.data.community_post, communityReplies: action.data.replies};

    case 'POSTED_COMMUNITY':
      return {...state, isSubmissionSucceeded: true};

    case 'REPLIED_COMMUNITY':
      return {...state, communityReplies: [...state.communityReplies, action.data]};


    default:
      return state;
  }
}