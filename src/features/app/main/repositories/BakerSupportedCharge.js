import * as Api from "providers/http/axios";

const Controller = {
  Urls: {
    Main: "BakerSupportedCharge",
  },
  Get: (params) => {
    return async () => {
      console.log(params);
      var url = `${Controller.Urls.Main}?d=2`;
      Object.keys(params).forEach((element) => {
        url += `&${element}=${params[element]}`;
      });
      return await Api.api_get(url);
    };
  },
  DocumentsReport: (body) => {
    return async () => {
      var url = `${Controller.Urls.Main}/report?d=2`;
      return await Api.api_post(url, body);
    };
  },
  Documents: (body) => {
    console.log(body);
    return async () => {
      var url = `${Controller.Urls.Main}/documents?d=2`;
      return await Api.api_post(url, body);
      /*console.log(params);
      var url = `${Controller.Urls.Main}/report?d=2`;
      Object.keys(params).forEach((element) => {
        url += `&${element}=${params[element]}`;
      });
      return await Api.api_get(url);*/
    };
  }, GetDocument: (id) => {
    return async () => {
      return await Api.api_get(`${Controller.Urls.Main}/document?id=${id}`);
    };
  },GetPartners: (id) => {
    return async () => {
      return await Api.api_get(`${Controller.Urls.Main}/partners?id=${id}`);
    };
  },
  UpdateDocument: (body) => {
    console.log(body);
    return async () => {
      var url = `${Controller.Urls.Main}/document?d=2`;
      return await Api.api_post(url, body);
    };
  }, Search: (body) => {
    console.log(body);
    return async () => {
      var url = `${Controller.Urls.Main}/search?d=2`;
      return await Api.api_post(url, body);
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
  PostList: (body, serial) => {
    return async () => {
      return await Api.api_post(
        `${Controller.Urls.Main}/list?serial=${serial}`,
        body
      );
    };
  },
  /*Object.keys(current).forEach((element) => {
          if (groupByCategory[element].length > 1)
            tk = [...tk, ...groupByCategory[element]];
        }); */
  PatchList: (body, documentId) => {
    return async () => {
      const body1 = body.reduce((prev, current) => {
        return [
          ...prev,
          Object.keys(current).reduce((prev_fields, current_field) => {
            return [
              ...prev_fields,
              {
                op: "replace",
                path: `/${[current_field]}`,
                value: current[current_field],
              },
            ];
          }, []),
        ];
      }, []);
      console.log(body1);
      return await Api.api_patch(
        `${Controller.Urls.Main}/list?documentId=${documentId}`,
        body1
      );
    };
  },
  Delete: (body) => {
    return async () => {
      return await Api.api_delete(Controller.Urls.Main, body);
    };
  },
};

export default Controller;
