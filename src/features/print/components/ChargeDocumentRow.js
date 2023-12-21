import React from "react";
import { useReactToPrint } from "react-to-print";
import {BakerSupportedChargeApi } from "features/app/main/repositories";
import { useParams } from "react-router-dom";

import moment from "jalali-moment";
import { formatNumberWithCommas, converNumberToLetter } from "helpers/Utils";

<link
  rel="stylesheet"
  href="%PUBLIC_URL%/assets/vendor/css/pages/app-invoice-print.css"
  type="text/css"
/>;

export default function ChargeDocumentRow(props) {
  const { id } = useParams();
  const { document, report } = props;
  const [partners, setPartners] = React.useState([]);
  const columnWidth = 7;
  const printRef = React.useRef();



  React.useEffect(() => {
    BakerSupportedChargeApi.GetPartners(document.id)
          .apply()
          .then((res1) => {
            setPartners(res1.data);
          });

  }, [document]);

  const getReport = (states) => {
    if (states.length == 0)
      return report.reduce(
        (prev, current) => {
          return {
            price: prev.price + current.price,
            count: prev.count + current.count,
          };
        },
        { price: 0, count: 0 }
      );

    return report.filter((m) => states.includes(m.stateId)).reduce(
      (prev, current) => {
        return {
          price: prev.price + current.price,
          count: prev.count + current.count,
        };
      },
      { price: 0, count: 0 }
    );
  };

  
  return (
    <div>
      <div class="table-responsive bordered mb-2">
        <div class="invoice-item">
          <div style={{ width: `${columnWidth * 7}%`, direction: "rtl" }}>
            <h6 style={{ marginBottom: 0, display: "inline" }}>شماره سریال:</h6>
            {"  "}
            <label style={{ direction: "ltr" }} className="fontEn">
              {document ? document.serial : ""}
            </label>
          </div>
          <div style={{ width: `${columnWidth * 7}%`, direction: "rtl" }}>
            <h6 style={{ marginBottom: 0, display: "inline" }}>تاریخ:</h6>
            {"  "}
            <label style={{ direction: "ltr" }} className="fontEn">
              {document ? moment(document.dateCharge).locale("fa").format("YYYY/MM/DD") : ""}
            </label>
          </div>
        </div>

        <div class="invoice-item">
          <div style={{ width: `${columnWidth * 15}%`, direction: "rtl" }}>
            <h6 style={{ marginBottom: 0, display: "inline" }}>توضیحات:</h6>
            {"  "}
            <label style={{ direction: "ltr" }}>
              {document ? document.comment : ""}
            </label>
          </div>
        </div>
      </div>
      <div class="table-responsive ">
        <div
          class="invoice-item bordered"
          style={{ backgroundColor: "#f7f7f7" }}
        >
          <div
            className="invoice-item-field"
            style={{ width: `${columnWidth}%` }}
          >
            درخواست
          </div>
          <div
            className="invoice-item-field"
            style={{ width: `${columnWidth * 3 - 2}%` }}
          >
            مبلغ درخواست
          </div>
          <div
            className="invoice-item-field"
            style={{ width: `${columnWidth}%` }}
          >
            شارژ
          </div>
          <div
            className="invoice-item-field"
            style={{ width: `${columnWidth * 3 - 2}%` }}
          >
            مبلغ شارژ
          </div>
          <div
            className="invoice-item-field"
            style={{ width: `${columnWidth}%` }}
          >
            خطادار
          </div>
          <div
            className="invoice-item-field"
            style={{ width: `${columnWidth}%` }}
          >
            مانده
          </div>
          <div
            className="invoice-item-field"
            style={{ width: `${columnWidth * 3}%` }}
          >
            مانده
          </div>
        </div>
        <div className="bordered mb-1">
          <div class="invoice-item border-bottom">
            <div
              className="invoice-item-field fontEn"
              style={{ width: `${columnWidth}%` }}
            >
              {report ? formatNumberWithCommas(getReport([]).count) : 0}
            </div>
            <div
              className="invoice-item-field fontEn"
              style={{ width: `${columnWidth * 3 - 2}%` }}
            >
              {report ? formatNumberWithCommas(getReport([]).price) : 0}
            </div>
            <div
              className="invoice-item-field"
              style={{ width: `${columnWidth}%` }}
            >
              {report ? formatNumberWithCommas(getReport([5]).count) : 0}
            </div>
            <div
              className="invoice-item-field"
              style={{ width: `${columnWidth * 3 - 2}%` }}
            >
              {report ? formatNumberWithCommas(getReport([5]).price) : 0}
            </div>
            <div
              className="invoice-item-field"
              style={{ width: `${columnWidth}%` }}
            >
              {report ? formatNumberWithCommas(getReport([13]).count) : 0}
            </div>
            <div
              className="invoice-item-field"
              style={{ width: `${columnWidth}%` }}
            >
              {report ? formatNumberWithCommas(getReport([1]).count) : 0}
            </div>
            <div
              className="invoice-item-field"
              style={{ width: `${columnWidth * 3}%` }}
            >
              {report ? formatNumberWithCommas(getReport([1]).price) : 0}
            </div>
          </div>
        </div>
        <div className="mb-3">
          {

            partners.map(partner => {
              return <div className="bordered">
                <div class="invoice-item border-bottom">
                  <div
                    className="invoice-item-field fontEn"
                    style={{ width: `${columnWidth * 4 - 2}%` }}
                  >
                    {partner.name}
                  </div>
                  <div
                    className="invoice-item-field fontEn"
                    style={{ width: `${columnWidth * 2 - 2}%` }}
                  >
                    {report ? formatNumberWithCommas(partner.price) : 0}
                  </div>
                  <div
                    className="invoice-item-field fontEn"
                    style={{ width: `${columnWidth * 8 - 2}%` }}
                  >
                  </div>
                </div>
              </div>;
            })
          }
        </div>
      </div>
    </div>
  );
}
