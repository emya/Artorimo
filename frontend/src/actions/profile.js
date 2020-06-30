export const fetchProfile = userId => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(`/api/profiles/?userId=${userId}`, {headers, })
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
          return dispatch({type: 'FETCH_PROFILE', profile: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

export const fetchProfiles = userId => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch("/api/profiles/?all=true", {headers, })
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
          return dispatch({type: 'FETCH_PROFILES', profiles: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

export const updateProfile = (
  id, user_name, residence, style, work_process, employment_type,
  availability, tools, skills, achievement, payment_method, img
  ) => {
  return (dispatch, getState) => {
    const formData = new FormData();

    let headers = {};
    let {token} = getState().auth;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    if (user_name !== null) {
      formData.append('user_name', user_name);
    }
    if (residence !== null) {
      formData.append('residence', residence);
    }
    if (style !== null) {
      formData.append('style', style);
    }
    if (work_process !== null) {
      formData.append('work_process', work_process);
    }
    if (employment_type !== null) {
      formData.append('employment_type', employment_type);
    }
    if (availability !== null) {
      formData.append('availability', availability);
    }
    if (tools !== null) {
      formData.append('tools', tools);
    }
    if (skills !== null) {
      formData.append('skills', skills);
    }
    if (achievement !== null) {
      formData.append('achievement', achievement);
    }
    if (payment_method !== null) {
      formData.append('payment_method', payment_method);
    }
    formData.append('image', img);

    return fetch(`/api/profiles/${id}/`, {headers, method: "PATCH", body: formData})
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
          return dispatch({type: 'UPDATE_PROFILE', profile: res.data});
        } else if (res.status === 401 || res.status === 403) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}