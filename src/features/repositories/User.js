import * as Api from "providers/http/axios";

const Controller = {
  Urls: {
    Main: "User",
  },
  Login: (body) => {
    return async () => {
    return await Api.api_post(Controller.Urls.Main+'/Login', body);
    };
  },
  Register: (body) => {
    return async () => {
      return await Api.api_post(Controller.Urls.Main, body);
    };
  },
  ChangePassword: (body) => {
    return async () => {
      return await Api.api_post(`{${Controller.Urls.Main}/ChangePass}`, body);
    };
  },
};

export default Controller;