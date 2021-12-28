export const askHelp = (email, message) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json"};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({email, message});

    return fetch("/api/ask/help/", {headers, body, method: "POST"})
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
          dispatch({type: 'ASKED_HELP', data: res.data });
          return res.data;
        } else {
          dispatch({type: "ASKED_HELP_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}

export const askGoods = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json"};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = {};

    return fetch("/api/ask/goods/", {headers, body, method: "POST"})
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
          dispatch({type: 'ASKED_GOODS', data: res.data });
          return res.data;
        } else {
          dispatch({type: "ASKED_HELP_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}

export const askIconio = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json"};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = {};

    return fetch("/api/ask/iconio/", {headers, body, method: "POST"})
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
          dispatch({type: 'ASKED_GOODS', data: res.data });
          return res.data;
        } else {
          dispatch({type: "ASKED_HELP_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}