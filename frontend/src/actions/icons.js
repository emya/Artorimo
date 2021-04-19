export const orderIcon = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json"};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    console.log("orderIcon")
    let body = {};

    return fetch("/api/order/icon/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          console.log("Server returned", res.body)
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
          dispatch({type: "ORDER_ICON", data: res.data });
          return res.data;
        } else {
          dispatch({type: "ORDER_ICON_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}

export const fetchIconParts = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json"};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    console.log("getIconParts")

    return fetch("/api/icons/maker/", {headers, })
      .then(res => {
        if (res.status < 500) {
          console.log("Server returned", res.body)
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
          dispatch({type: "GET_ICON_PARTS", data: res.data });
          return res.data;
        } else {
          dispatch({type: "GET_ICON_PARTS_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}