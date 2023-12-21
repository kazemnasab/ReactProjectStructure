import * as Api from "providers/http/axios";

const Controller = {
  Urls: {
    Main: "BakerSupported",
  },
  Get: (params) => {
    return async () => {
      var url = `${Controller.Urls.Main}?d=2`;
      Object.keys(params).forEach((element) => {
        url += `&${element}=${params[element]}`;
      });
      return await Api.api_get(url);
    };
  },
  Report: (body) => {
    //onsole.log(body);
    return async () => {
      var url = `${Controller.Urls.Main}/search?d=2`;
      return await Api.api_post(url, body);
    };
  },
  ReportGroupBy: (body, field) => {
    return async () => {
      var url = `${Controller.Urls.Main}/searchgroupby?field=${field}`;
      return await Api.api_post(url, body);
    };
  },
  GetById: (id) => {
    return async () => {
      return await Api.api_get(`${Controller.Urls.Main}/${id}`);
    };
  },
  Log: (id) => {
    return async () => {
      return await Api.api_get(`${Controller.Urls.Main}/log/${id}`);
    };
  },
  Post: (body) => {
    return async () => {
      return await Api.api_post(Controller.Urls.Main, body);
    };
  },
  PostList: (body) => {
    return async () => {
      return await Api.api_post(`${Controller.Urls.Main}/list`, body);
    };
  },
  /*Object.keys(current).forEach((element) => {
          if (groupByCategory[element].length > 1)
            tk = [...tk, ...groupByCategory[element]];
        }); */
  PatchList: (body) => {
    return async () => {
      const body1 = body.reduce((prev, current) => {
        return [
          ...prev,
          Object.keys(current).reduce((prev_fields, current_field) => {
            return [
              ...prev_fields,
              { op: "replace", path: `/${[current_field]}`, value: current[current_field] },
            ];
          }, []),
        ];
      }, []);
      console.log(body1);
      return await Api.api_patch(`${Controller.Urls.Main}/list`, body1);
    };
  },
  Delete: (body) => {
    return async () => {
      return await Api.api_delete(Controller.Urls.Main, body);
    };
  },
};

export default Controller;
