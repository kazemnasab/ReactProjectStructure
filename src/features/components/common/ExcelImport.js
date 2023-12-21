import * as React from "react";
import { Row, Card, CardBody, Input, Spinner } from "reactstrap";
import { Colxx, Separator } from "features/components/bootstrap/CustomBootstrap";
import { injectIntl } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";
import readXlsxFile from "read-excel-file";
import * as XLSX from 'xlsx';

import Select from "react-select";

import IntlMessages from "helpers/IntlMessages";
import * as yup from "yup";
import Loading from "react-fullscreen-loading";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import CustomFromLabel from "features/components/common/CustomFromLabel";
import CustomContainerModal from "./CustomContainerModal";
import CustomDataGrid from "./CustomDataGrid";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import CustomButton from "./CustomButton";

const excelCol = [
  { key: 0, value: 0, label: "A", selected: "" },
  { key: 1, value: 1, label: "B", selected: "" },
  { key: 2, value: 2, label: "C", selected: "" },
  { key: 3, value: 3, label: "D", selected: "" },
  { key: 4, value: 4, label: "E", selected: "" },
  { key: 5, value: 5, label: "F", selected: "" },
  { key: 6, value: 6, label: "G", selected: "" },
  { key: 7, value: 7, label: "H", selected: "" },
  { key: 8, value: 8, label: "I", selected: "" },
  { key: 9, value: 9, label: "J", selected: "" },
  { key: 10, value: 10, label: "K", selected: "" },
  { key: 11, value: 11, label: "L", selected: "" },
  { key: 12, value: 12, label: "M", selected: "" },
  { key: 13, value: 13, label: "N", selected: "" },
  { key: 15, value: 15, label: "P", selected: "" },
  { key: 16, value: 16, label: "Q", selected: "" },
  { key: 18, value: 17, label: "R", selected: "" },
  { key: 19, value: 17, label: "S", selected: "" },
];

const ExcelImport = (props) => {
  const {
    dataFields,
    groupActions = [],
    postData,
    filterData = null,
    title,
    intl,
    onCallBack,
    startColIndex = 0,
    previewConfirm,
  } = props;

  const { messages } = intl;
  const [startIndex, setStartIndex] = React.useState(2);
  const [endIndex, setEndIndex] = React.useState(2);
  const [selectedSheet, setSelectedSheet] = React.useState(-1);
  const [excelData, setExcelData] = React.useState(null);
  const [excelSheets, setExcelSheets] = React.useState([]);
  const [excelFile, setExcelFile] = React.useState(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [selectedGroupActions, setSelectedGroupActions] = React.useState([]);
  const [columns, setColumns] = React.useState(excelCol);
  const [optionFields, setOptionFields] = React.useState(
    dataFields.map((item, index) => {
      return { ...item, selectedIndex: index + startColIndex };
    })
  );
  const [excelRows, setExcelRows] = React.useState([]);

  React.useEffect(() => {
    if (excelFile) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var data = e.target.result;
        let readedData = XLSX.read(data, { type: 'binary' });
        setExcelData(readedData);
        setExcelSheets(readedData.SheetNames);
        setSelectedSheet(0);
        console.log("excelData12");
        return;
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];

        /* Convert array to json*/
        const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
        console.log(dataParse);
        return;
        //setFileUploaded(dataParse);
      };
      reader.readAsBinaryString(excelFile);
    }
  }, [excelFile]);

  React.useEffect(() => {
    console.log("selectedSheet");
    setExcelRows([]);
    
    if (excelData == null)
      return;
    const wsname = excelData.SheetNames[selectedSheet];
    const ws = excelData.Sheets[wsname];

    /* Convert array to json*/
    const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
    setExcelRows(dataParse);
    setStartIndex(2);
    setEndIndex(dataParse.length);
  }, [selectedSheet]);

  const handleUpload = (e) => {
    e.preventDefault();
    setSelectedSheet(-1);
    var files = e.target.files;
    var f = files[0];
    setExcelFile(f);
    return;

  }

  const getLoadedData = () => {
    var body = excelRows
      .filter((m, index) => index > startIndex - 2 && index < endIndex)
      .map((item, index) => {
        return optionFields.reduce(
          (prev, currentValue, currentIndex) => {
            return {
              ...prev,
              [currentValue.code]: item[currentValue.selectedIndex] ?? "",
            };
          },
          { id: index }
        );
      });
    return body;
  };

  const saveData = React.useCallback(() => {
    setIsSaving(true);
    var data = excelRows
      .filter((m, index) => index > startIndex - 2 && index < endIndex)
      .map((item) => {
        var val = optionFields
          .filter((m) => m.selectedIndex >= 0)
          .reduce((prev, currentValue, currentIndex) => {
            return {
              ...prev,
              [currentValue.code]: item[currentValue.selectedIndex] ?? "",
            };
          }, {});
        val = selectedGroupActions.reduce(
          (prev, currentValue, currentIndex) => {
            return {
              ...prev,
              [currentValue.field]: currentValue.value.value,
            };
          },
          val
        );
        return val;
      });
    var api = postData(data);
    api.then((res) => {
      setIsSaving(false);
      if (res.data) onCallBack(true, res);
    });
    api.catch((m) => setIsSaving(false));
  }, [optionFields, startIndex, endIndex, excelRows, selectedGroupActions]);

  const searchData = React.useCallback(() => {
    var data = optionFields
      .filter((m) => m.selectedIndex >= 0)
      .reduce((prev, currentValue, currentIndex) => {
        return {
          ...prev,
          [`${currentValue.code}s`]: excelRows
            .filter((m, index) => index > startIndex - 2 && index < endIndex)
            .map((item) => item[currentValue.selectedIndex]),
        };
      }, {});
    onCallBack(true, data);
    filterData(data);
  }, [optionFields, startIndex, endIndex, excelRows, selectedGroupActions]);

  return (
    <>
      <Loading
        loading={isSaving}
        background="radial-gradient(rgba(250, 250, 250, 0.1), rgba(250, 250, 250, 0.1))"
        loaderColor="#3498db"
      />
      <Card>
        <CardBody>
          <Row className="mb-2">
            <Colxx sm="12" md="6" lg="4">
              <CustomFromLabel label={"import.excel"}>
                <Input
                  id="exampleFile"
                  title="rere"
                  name="file"
                  type="file"
                  onChange={(e) => {
                    /*readXlsxFile(e.target.files[0]).then((rows) => {
                      setExcelRows(rows);
                      setStartIndex(2);
                      setEndIndex(rows.length);
                    });*/
                    handleUpload(e);
                  }}
                />
              </CustomFromLabel>
            </Colxx>
            <Colxx sm="12" md="2" lg="2">
              <CustomFromLabel label={"row.number.start"}>
                <Input
                  value={startIndex}
                  onChange={(e) => {
                    setStartIndex(e.target.value);
                  }}
                  placeholder="ردیف"
                  type="number"
                  min={1}
                />
              </CustomFromLabel>
            </Colxx>
            <Colxx sm="12" md="2" lg="2">
              <CustomFromLabel label={"row.number.end"}>
                <Input
                  value={endIndex}
                  onChange={(e) => {
                    setEndIndex(e.target.value);
                  }}
                  placeholder="ردیف"
                  type="number"
                  min={1}
                />
              </CustomFromLabel>
            </Colxx>
            <Colxx sm="12" md="2" lg="2">
              <CustomFromLabel label={"excel.sheet"}>
                <Select
                  className="react-select"
                  classNamePrefix="react-select"
                  placeholder=""
                  value={{value: selectedSheet, label:excelSheets[selectedSheet] }}
                  options={excelSheets.map((m, index)=>{return {value: index, label: m};})}
                  onChange={(value)=>{
                    setSelectedSheet(value.value);
                  }}
                />
              </CustomFromLabel>
            </Colxx>
          </Row>
          <Row>
            {optionFields.map((currentOptionField, currentOptionIndex) => (
              <Colxx sm="12" md="2" lg="2">
                <CustomFromLabel label={currentOptionField.label}>
                  <Select
                    className="react-select"
                    classNamePrefix="react-select"
                    options={columns.filter((m) => m.label)}
                    placeholder=""
                    isClearable
                    value={
                      columns.find(
                        (m, index) => currentOptionField.selectedIndex == index
                      ) ?? null
                    }
                    onChange={(selectedValue) => {
                      setOptionFields(
                        optionFields.map((optionField, index) => {
                          if (currentOptionField == optionField)
                            return {
                              ...optionField,
                              selectedIndex: selectedValue
                                ? selectedValue.value
                                : -1,
                            };
                          if (currentOptionIndex == index)
                            return { ...optionField, selectedIndex: -1 };
                          else return optionField;
                        })
                      );
                    }}
                  />
                </CustomFromLabel>
              </Colxx>
            ))}
            {/*
            groupActions=[{
              label:'label',
              field:'field',
              options:[],
            }]
            */}
            {groupActions.map((groupActionItem, groupActionIndex) => (
              <Colxx
                sm="12"
                md={groupActionItem.md ?? "2"}
                lg={groupActionItem.lg ?? "2"}
              >
                <CustomFromLabel label={groupActionItem.label}>
                  <Select
                    className="react-select"
                    classNamePrefix="react-select"
                    options={groupActionItem.options}
                    placeholder=""
                    isClearable
                    value={
                      selectedGroupActions.find(
                        (m) => m.field == groupActionItem.field
                      )
                        ? selectedGroupActions.find(
                          (m) => m.field == groupActionItem.field
                        ).value
                        : null
                    }
                    onChange={(selectedValue) => {
                      const temp = selectedGroupActions.filter(
                        (m) => m.field != groupActionItem.field
                      );
                      if (!selectedValue) setSelectedGroupActions(temp);
                      else
                        setSelectedGroupActions([
                          ...temp,
                          {
                            field: groupActionItem.field,
                            value: selectedValue,
                          },
                        ]);
                    }}
                  />
                </CustomFromLabel>
              </Colxx>
            ))}
          </Row>
          <Row>
            <CustomDataGrid
              indexer_width={80}
              rows={getLoadedData()}
              columns={optionFields.map((item) => {
                return {
                  field: item.code,
                  headerName: messages[item.label],
                  flex: 1,
                };
              })}
              pagination
              rowsPerPageOptions={[5]}
              pageSize={10}
            />
          </Row>
          <Colxx xxs="12" className="mt-1 btn-row">
            {postData && (
              <>
                <CustomButton
                  label={"submit.change"}
                  btnClass="primary"
                  child={<CheckRoundedIcon color="lignt" fontSize="small" />}
                  onClick={saveData}
                />
                {"   "}
              </>
            )}
            {filterData && (
              <>
                <CustomButton
                  label={"apply.filter"}
                  style={{ float: "right" }}
                  btnClass="success"
                  child={
                    <FilterAltRoundedIcon color="lignt" fontSize="small" />
                  }
                  onClick={searchData}
                />
                {"   "}
              </>
            )}
            <CustomButton
              label="cancel.change"
              btnClass="label-danger"
              child={<CloseRoundedIcon color="lignt" fontSize="small" />}
              onClick={() => {
                onCallBack(false, null);
              }}
            />
          </Colxx>
        </CardBody>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default injectIntl(connect(mapStateToProps, {})(ExcelImport));
