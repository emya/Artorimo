export const getPaypal = (order_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    let headers = {"Content-Type": "application/json"};

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    console.log(order_id);
    let params = `?order_id=${order_id}`;

    return fetch(`/api/payment/paypal/${params}`, {headers, })
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