//To concate the path for the public folder
export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;

export const setupAxios = (axios, store) => {

    const token = JSON.parse(localStorage.getItem("user"));

    if (token) {
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    }

    axios.interceptors.response.use(null, (err) => {
        if (err.response) {
            if (err?.response?.status === 403 || err?.response?.status === 401) {
                store.dispatch({ type: "LOGIN_FAIL" });
                return Promise.reject(err);
            } else return Promise.reject(err);
        } else if (err.request) {
            return Promise.reject({
                response: {
                    data: {
                        message: "Something went wrong, Please try again later!!!",
                    },
                },
            });
        }
    });
};
