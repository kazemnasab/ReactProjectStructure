import React, { useEffect, useState } from "react";
import { Row, Card, CardBody, Input, Label, Button } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import Select from "react-select";

import { Colxx, Separator } from "features/components/bootstrap/CustomBootstrap";
import { useForm, Controller } from "react-hook-form";

import IntlMessages from "helpers/IntlMessages";
import { BillApi } from "../../repositories";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as DonTypeSelector from "redux/dontype/selector";
import { getCurrentUser } from "helpers/Utils";

const FundRegister = (props) => {
  const currentUser = getCurrentUser();
  const { intl, onCallBack, dontypes, serial, date } = props;
  const [isSaving, setIsSaving] = React.useState(false);
  const { messages } = intl;
  const schema = yup.object().shape({
    billSerial: yup
      .number()
      .required(`${messages["app.bill.billserial"]} ${messages["not.entered"]}`),
    price: yup
      .number()
      .required(`${messages["app.bill.price"]} ${messages["not.entered"]}`),
    mobile: yup
      .string()
      .required(`${messages["profile.mobile"]} ${messages["not.entered"]}`),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const donTypeId = watch(
    "donTypeId",
    dontypes.length > 0 ? { value: dontypes[0].id, label: dontypes[0].title } : null
  );
  useEffect(() => {
    setValue(
      "donTypeId",
      dontypes.length > 0 ? { value: dontypes[0].id, label: dontypes[0].title } : null
    );
  }, []);

  const saveBill = (data) => {
    const body = {
      ...data,
      id: data.id ?? 0,
      donTypeId: data.donTypeId.value,
      agentId: currentUser.id,
      fundId: -99999999,
      serial: serial,
      date: date,
      stateId: 1
    };
    setIsSaving(true);
    var api = BillApi.Post(body).apply();
    api.then((res) => {
      setIsSaving(false);
      if (!res.data.message) {
        onCallBack(false, res.data);
        setValue("price", "");
        setValue("mobile", "");
        setValue("billSerial", "");
      }
      else alert(res.data.message);
    });
  };

  const onSubmit = (data) => {
    if (!isSaving) saveBill(data);
  };
  return (
    <>
      <Row>
        <Colxx xxs="12" xl="12" className="mb-4">
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <>
                  <Row className="mb-2">
                    <Colxx sm="12" md="6" lg="6">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="profile.mobile" />
                        </span>
                        <Controller
                          name="mobile"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                        {errors.mobile ? (
                          <div className="invalid-feedback d-block">
                            {errors.mobile.message}
                          </div>
                        ) : null}
                      </Label>
                    </Colxx>
                    <Colxx sm="12" md="6" lg="6">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.bill.price" />
                        </span>
                        <Controller
                          name="price"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                      </Label>
                    </Colxx>
                    <Colxx sm="12" md="12" lg="12">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.bill.dontype" />
                        </span>
                        <Controller
                          name="donTypeId"
                          control={control}
                          render={({ field }) => (
                            <Select
                              className="react-select"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              defaultValue={donTypeId}
                              {...field}
                              options={dontypes.map((item) => {
                                return {
                                  key: item.id,
                                  value: item.id,
                                  label: item.title,
                                };
                              })}
                              placeholder=""
                            />
                          )}
                        />
                      </Label>
                    </Colxx>
                    <Colxx sm="12" md="12" lg="12">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.bill.billserial" />
                        </span>
                        <Controller
                          name="billSerial"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                      </Label>
                    </Colxx>
                  </Row>
                  <Colxx xxs="10">
                    <Button color="success" type="submit">
                      {!isSaving ? (
                        <IntlMessages id="submit.change" />
                      ) : (
                        <IntlMessages id="submit.loading" />
                      )}
                    </Button>
                    {"  "}
                    <Button
                      color="danger"
                      onClick={() => {
                        onCallBack(true, null);
                      }}
                    >
                      <IntlMessages id="cancel.change" />
                    </Button>
                  </Colxx>
                </>
              </form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = (state, { targets }) => {
  const dontypes = DonTypeSelector.selectItemsSearch(state, 0, "");
  return {
    dontypes,
  };
};

export default injectIntl(connect(mapStateToProps, {})(FundRegister));