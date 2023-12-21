
const urls = [
  {
    id: "action",
    title: ["app.main.cost.information"],
    subs: [
      {
        type: "simple",
        title: ["app.main.cost.relations"],
        icon: "relation",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
        url: "/app/main/relation",
      },{
        type: "simple",
        title: ["app.main.cost.supported"],
        icon: "people",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
        url: "/app/main/supported",
      }
    ],
  }, {
    id: "action",
    title: ["app.main.cost.pay"],
    subs: [
      {
        type: "simple",
        title: ["app.main.cost.charge.req"],
        icon: "charge-folder",
        url: "/app/main/charge",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },{
        type: "simple",
        title: ["app.main.cost.pay.new"],
        icon: "payment",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
    ],
  }
];
export default urls;
