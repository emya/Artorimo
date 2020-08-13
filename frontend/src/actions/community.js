export const fetchCommunityPosts = (category = null) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json"};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    console.log(category);
    var query = "";
    if (category !== null) {
      query = `category=${category}`;
    }

    return fetch(`/api/community/post/?${query}`, {headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'FETCH_COMMUNITY_POSTS', data: res.data });
          return res.data;
        } else {
          dispatch({type: "ASKED_HELP_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}

export const postCommunity = (title, msg, category) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json"};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({title, msg, category});

    console.log(body, category);

    return fetch("/api/community/post/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'POSTED_COMMUNITY', data: res.data });
          return res.data;
        } else {
          dispatch({type: "ASKED_HELP_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}