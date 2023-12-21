
const urls = [
  {
    id: "action",
    title: ["app.saleservice.action"],
    subs: [
      {
        type: "simple",
        title: ["app.donation.fund.new"],
        icon: "profile-add",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
        modal: {
          page: "FundRegister",
          title: ["app.donation.fund.new"],
          size: "md",
        },
      },
      {
        type: "simple",
        title: ["app.donation.fund.list"],
        icon: "list",
        url: "/app/agent/fund/list",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
      {
        type: "simple",
        title: ["app.donation.bill.add"],
        icon: "donate-heart",
        url: "/app/agent/bill",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
      {
        type: "simple",
        title: ["app.donation.bill.report"],
        icon: "report",
        url: "/app/agent/bill/report",
        className: "col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mb-4",
      },
    ],
  }
];
export default urls;
