import React, { useEffect, useState } from "react";
import { Row, Card, CardBody, Input, Label, Button } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import Select from "react-select";

import { Colxx, Separator } from "features/components/bootstrap/CustomBootstrap";
import { useForm, Controller } from "react-hook-form";

import IntlMessages from "helpers/IntlMessages";
import { FundApi } from "../../repositories";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as RoutSelector from "redux/rout/selector";
import { getCurrentUser } from "helpers/Utils";

const FundRegister = (props) => {
  const currentUser = getCurrentUser();
  console.log(currentUser);
  const { fund, fundId, intl, onCallBack, routs } = props;
  const [isSaving, setIsSaving] = React.useState(false);
  const { messages } = intl;
  const schema = yup.object().shape({
    name: yup
      .string()
      .required(`${messages["profile.firstname"]} ${messages["not.entered"]}`),
    family: yup
      .string()
      .required(`${messages["profile.lastname"]} ${messages["not.entered"]}`),
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

  const routId = watch(
    "routId",
    routs.length > 0 ? { value: routs[0].id, label: routs[0].title } : null
  );
  useEffect(() => {
    setValue(
      "routId",
      routs.length > 0 ? { value: routs[0].id, label: routs[0].title } : null
    );
  }, []);

  useEffect(() => {
    if (fund) {
      setValue("id", fund.id);
      setValue("number", fund.number);
      setValue("name", fund.name);
      setValue("family", fund.family);
      setValue("mobile", fund.mobile);
      setValue("tel1", fund.tel1);
      setValue("address", fund.address);
      setValue("comment", fund.comment);
      var rout = routs.find((m) => m.id == fund.routId);
      setValue("routId", { value: rout.id, label: rout.title });
    }
  }, [fund]);

  const saveFund = (data) => {
    console.log(currentUser);
    const body = {
      ...data,
      id: data.id ?? 0,
      routId: data.routId.value,
      agentId: currentUser.id,
    };
    setIsSaving(true);
    var api = FundApi.Post(body).apply();
    api.then((res) => {
      onCallBack(true, res.data);
      setIsSaving(false);
    });
  };

  const onSubmit = (data) => {
    if (!isSaving) saveFund(data);
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
                          <IntlMessages id="profile.firstname" />
                        </span>
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                        {errors.name ? (
                          <div className="invalid-feedback d-block">
                            {errors.name.message}
                          </div>
                        ) : null}
                      </Label>
                    </Colxx>
                    <Colxx sm="12" md="6" lg="6">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="profile.lastname" />
                        </span>
                        <Controller
                          name="family"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                        {errors.family ? (
                          <div className="invalid-feedback d-block">
                            {errors.family.message}
                          </div>
                        ) : null}
                      </Label>
                    </Colxx>
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
                          <IntlMessages id="profile.tel" />
                        </span>
                        <Controller
                          name="tel1"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                      </Label>
                    </Colxx>
                    <Colxx sm="12" md="12" lg="12">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="donation.fund.rout" />
                        </span>
                        <Controller
                          name="routId"
                          control={control}
                          render={({ field }) => (
                            <Select
                              className="react-select"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              defaultValue={routId}
                              {...field}
                              options={routs.map((item) => {
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
                          <IntlMessages id="profile.address" />
                        </span>
                        <Controller
                          name="address"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                      </Label>
                    </Colxx>
                    <Colxx sm="12" md="12" lg="12">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="comment" />
                        </span>
                        <Controller
                          name="comment"
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
  const routs = RoutSelector.selectItemsSearch(state, 0, "");
  return {
    routs,
  };
};

export default injectIntl(connect(mapStateToProps, {})(FundRegister));