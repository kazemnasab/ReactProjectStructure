import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { formatNumberWithCommas } from "helpers/Utils";
import { BakerSupportedChargeApi } from "../../repositories";
import BorderAllRoundedIcon from "@mui/icons-material/BorderAllRounded";
import { IconButton } from "@mui/material";
import ExcelImport from "features/components/common/ExcelImport";
import { DialogContext } from "providers/context/contexts";
import { supportedChargeExcelFields } from "features/app/main/columns/supported";
import DocumentRegister from "./DocumentRegister";
import { Button, FormGroup, Input, Label } from "reactstrap";
import PrintIcon from '@mui/icons-material/Print';

const ChargeListItem = (props) => {
  const navigate = useNavigate();
  const { pageCloseDialogAction, pageOpenDialogAction} =
    React.useContext(DialogContext);
  const { intl, document, onChecked } = props;
  const { messages } = intl;
  const [report, setRepost] = React.useState(null);
  const [reload, setReload] = React.useState(1);
  React.useEffect(() => {
    BakerSupportedChargeApi.DocumentsReport({ documentIds: [document.id], stateId: 0 })
      .apply()
      .then((res) => {
        console.log(res.data);
        setRepost(res.data);
      });
  }, [reload]);
  const getReport = (states) => {
    console.log(report);
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

  const openSupportedExcelImport = (stateId) => {
    const child = (
      <ExcelImport
        defaultCols={["", "name", "family", "number", "birth", "bankNumber"]}
        dataFields={supportedChargeExcelFields}
        onCallBack={onCallBackSupportedExcelImport}
        title="app.main.cost.supported"
        postData={saveExcelSheet(stateId)}
        startColIndex={0}
      />
    );
    pageOpenDialogAction({
      page: "SupportedExcelImport",
      title: ["app.main.cost.supported"],
      size: "xl",
      child: child,
    });
  };
  const onCallBackSupportedExcelImport = (close, res) => {
    if (close) pageCloseDialogAction({ page: "SupportedExcelImport" });
    setReload(reload + 1);
  };
  const saveExcelSheet = (stateId) => {
    return async (data) => {
      data = data.map((item) => {
        return {
          stateId: stateId,
          trackNumber: item.number,
        };
      });
      console.log(data);
      return await BakerSupportedChargeApi.PatchList(data, document.id).apply();
    };
  };

  const openDocument = () => {
    pageOpenDialogAction({
      page: "DocumentRegister",
      title: ["app.main.cost.recharge.req"],
      size: "md",
      child: (
        <DocumentRegister id={document.id} document={document} />
      ),
      onCallBack: (close, res) => {
        pageCloseDialogAction({ page: "DocumentRegister" });
      },
    });
  }

  const print = (id) => {
    window.open(
      "/print/document/" + id,
      "winname",
      "directories=no,titlebar=no,addressbar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=700,height=800"
    );
  }


  return (
    <div
      className={"col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6 mb-2"}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <FormGroup className="mb-2" check style={{ position: "absolute", zIndex: 1000, right: 16, top: -2 }}>
        <Label check>
          <Input type="checkbox" onClick={(e) => { onChecked(e.target.checked) }} />{' '}
        </Label>
      </FormGroup>
      <div className="card">
        <div className="card-body mb-2">
          <table className="table">
            <tr>
              <h5 className="card-title mb-0 primary-font" style={{ textDecoration: 'underline', marginTop: "-15px" }} onClick={openDocument} >
                {document.serial}
              </h5>
              <span style={{ position: "absolute", top: 1, left: 0 }}>
                <IconButton
                  size="medium"
                  onClick={() => {
                    print(document.id);
                  }}
                  title={messages["print"]}
                >
                  <PrintIcon color="info" fontSize="12" />
                </IconButton>
              </span>
            </tr>
            <tr
              onClick={() => {
                navigate(`${document.id}`);
              }}
            >
              <td colSpan={1}>درخواست</td>
              <td>{report ? formatNumberWithCommas(getReport([]).count) : 0}</td>
              <td>{report ? formatNumberWithCommas(getReport([]).price) : 0}</td>
            </tr>
            <tr
              onClick={() => {
                navigate(`${document.id}/5`);
              }}
            >
              <td colSpan={1}>انجام شده</td>
              <td>{report ? formatNumberWithCommas(getReport([5]).count) : 0}</td>
              <td>{report ? formatNumberWithCommas(getReport([5]).price) : 0}</td>
              <td>
                <IconButton
                  size="small"
                  style={{ padding: 0 }}
                  onClick={() => {
                    openSupportedExcelImport(5);
                  }}
                  title={messages["app.main.cost.supported.new.bankcard"]}
                >
                  <BorderAllRoundedIcon color="info" fontSize="larg" />
                </IconButton>
              </td>
            </tr>
            <tr
              onClick={() => {
                navigate(`${document.id}/13`);
              }}
            >
              <td colSpan={1}>خطا دار</td>
              <td>
                {report ? formatNumberWithCommas(getReport([13]).count) : 0}
              </td>
              <td>
                {report ? formatNumberWithCommas(getReport([13]).price) : 0}
              </td>
              <td>
                <IconButton
                  size="small"
                  style={{ padding: 0 }}
                  onClick={() => {
                    openSupportedExcelImport(13);
                  }}
                  title={messages["app.main.cost.supported.new.bankcard"]}
                >
                  <BorderAllRoundedIcon color="info" fontSize="larg" />
                </IconButton>
              </td>
            </tr>
            <tr
              onClick={() => {
                navigate(`${document.id}/error`);
              }}
            >
              <td colSpan={1}>تناقض excel</td>
              <td>
                {report ? formatNumberWithCommas(getReport([130, 50]).count) : 0}
              </td>
              <td>
                {report ? formatNumberWithCommas(getReport([130, 50]).price) : 0}
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td
                onClick={() => {
                  navigate(`${document.id}/1`);
                }}
                colSpan={1}
              >
                مانده
              </td>
              <td>{report ? formatNumberWithCommas(getReport([1]).count) : 0}</td>
              <td>{report ? formatNumberWithCommas(getReport([1]).price) : 0}</td>
              <td>
                <IconButton
                  size="small"
                  style={{ padding: 0 }}
                  onClick={() => {
                    openSupportedExcelImport(1);
                  }}
                  title={messages["app.main.cost.supported.new.bankcard"]}
                >
                  <BorderAllRoundedIcon color="info" fontSize="larg" />
                </IconButton>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(ChargeListItem);
