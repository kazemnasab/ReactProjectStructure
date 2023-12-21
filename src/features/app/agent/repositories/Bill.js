import * as Api from "providers/http/axios";

const Controller = {
  Urls: {
    Main: "Bill",
  },
  Get: ({
    target = null,
    fundId = null,
    agentId = null,
    serial = null,
    billSerial = null,
    donTypeId = null,
    stateId = null,
  }) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
      url += target ? `&target=${target}` : "";
      url += fundId ? `&fundId=${fundId}` : "";
      url += agentId ? `&agentId=${agentId}` : "";
      url += serial ? `&serial=${serial}` : "";
      url += billSerial ? `&billSerial=${billSerial}` : "";
      url += donTypeId ? `&donTypeId=${donTypeId}` : "";
      url += stateId ? `&stateId=${stateId}` : "";
      console.log(url);
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
