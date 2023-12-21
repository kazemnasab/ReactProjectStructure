import * as Api from "providers/http/axios";

const Controller = {
  Urls: {
    Main: "Fund",
  },
  Get: ({
    target = null,
    number = null,
    id = null,
    agentId = null,
    agentGroupId = null,
    routId = null,
    stateId = null,
  }) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
      url += target ? `&target=${target}` : "";
      url += number ? `&number=${number}` : "";
      url += id ? `&id=${id}` : "";
      url += agentId ? `&agentId=${agentId}` : "";
      url += agentGroupId ? `&agentGroupId=${agentGroupId}` : "";
      url += routId ? `&routId=${routId}` : "";
      url += stateId ? `&stateId=${stateId}` : "";
      return await Api.api_get(url);
    };
  },
  GetById: (id) => {
    return async () => {
      return await Api.api_get(`${Controller.Urls.Main}/${id}`);
    };
  },
  Post: (body) => {
    return async () => {
      return await Api.api_post(Controller.Urls.Main, body);
    };
  },
  Delete: (body) => {
    return async () => {
      return await Api.api_delete(Controller.Urls.Main, body);
    };
  },
};

export default Controller;
