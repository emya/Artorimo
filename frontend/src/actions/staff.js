export const sendEmails = (email, subject, message) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json"};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({email, subject, message});

    return fetch("/api/notify/users/", {headers, body, method: "POST"})
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
          dispatch({type: 'SENT_EMAILS', data: res.data });
          return res.data;
        } else {
          dispatch({type: "ASKED_HELP_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}