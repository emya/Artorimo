export const getPaypal = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json"};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    console.log("getPaypal")

    return fetch("/api/payment/paypal/", {headers, })
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
          dispatch({type: "GET_PAYPAL", data: res.data });
          return res.data;
        } else {
          dispatch({type: "GET_PAYPAL_FAILURE", data: res.data});
          throw res.data;
        }
      })
  }
}