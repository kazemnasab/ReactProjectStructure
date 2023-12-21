import { Colxx, Separator } from "features/components/bootstrap/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import React from "react";
import Select from "react-select";
import { injectIntl } from "react-intl";
import { Row, Input, Label, Button } from "reactstrap";

const options = [
  { value: "1", label: "تهران" },
  { value: "2", label: "بابل" },
  { value: "3", label: "کرج" },
];

const RoutRegister = ({ intl }) => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [formState, setFormState] = React.useState(false);
  const { messages } = intl;

  const genders = [
    { value: 1, label: messages["profile.gender.male"] },
    { value: 2, label: messages["profile.gender.female"] },
  ];

  React.useEffect(() => {}, []);
  const [modal, setModal] = React.useState(false);
  const [unmountOnClose, setUnmountOnClose] = React.useState(true);

  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };
  React.useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    // if the form is NOT unchanged, then set the onbeforeunload
    if (formState) {
      window.addEventListener("beforeunload", handler);
      // clean it up, if the dirty state changes
      return () => {
        window.removeEventListener("beforeunload", handler);
      };
    }
    // since this is not dirty, don't do anything
    return () => {};
  }, [formState]);

  return (
    <>
      <Row>
        <Colxx sm="12" md="4" lg="2">
          <Label className="form-group has-float-label">
            <span>
              <IntlMessages id="donation.fund.number" />
            </span>
            <Input />
          </Label>
        </Colxx>
        <Colxx sm="12" md="4" lg="2">
          <Label className="form-group has-float-label">
            <span>
              <IntlMessages id="profile.firstname" />
            </span>
            <Input />
          </Label>
        </Colxx>
        <Colxx sm="12" md="4" lg="2">
          <Label className="form-group has-float-label">
            <span>
              <IntlMessages id="profile.lastname" />
            </span>
            <Input />
          </Label>
        </Colxx>
      </Row>
      <Row>
        <Colxx sm="12" md="4" lg="2">
          <Label className="form-group has-float-label">
            <span>
              <IntlMessages id="profile.gender" />
            </span>
            <Select
              placeholder=""
              defaultValue={selectedOption}
              options={genders}
            />
          </Label>
        </Colxx>
        <Colxx sm="12" md="4" lg="2">
          <Label className="form-group has-float-label">
            <span>
              <IntlMessages id="profile.mobile" />
            </span>
            <Input />
          </Label>
        </Colxx>
        <Colxx sm="12" md="4" lg="2">
          <Label className="form-group has-float-label">
            <span>
              <IntlMessages id="profile.tel" />
            </span>
            <Input />
          </Label>
        </Colxx>
      </Row>
      <Row>
        <Colxx sm="12" md="6" lg="6">
          <Label className="form-group has-float-label">
            <span>
              <IntlMessages id="profile.address" />
            </span>
            <Input />
          </Label>
        </Colxx>
      </Row>
      <Row>
        <Colxx sm="12" md="6" lg="6">
          <Label className="form-group has-float-label">
            <span>
              <IntlMessages id="donation.fund.rout" />
            </span>
            <Select
              placeholder={""}
              defaultValue={selectedOption}
              options={options}
            />
          </Label>
        </Colxx>
      </Row>
      <Row>
        <Colxx sm="12" md="12" lg="12">
          <Button onClick={toggle} color="success">
            ثبت تغییرات
          </Button>{" "}
          <Button color="info">جدید</Button>{" "}
        </Colxx>
      </Row>
    </>
  );
};
export default injectIntl(RoutRegister);
