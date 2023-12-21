import React, { useEffect, useState } from "react";
import { Row, Card, CardBody, Input, Label, Button } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import Select from "react-select";

import { Colxx, Separator } from "features/components/bootstrap/CustomBootstrap";
import { useForm, Controller } from "react-hook-form";

import IntlMessages from "helpers/IntlMessages";
import { BakerRelationApi} from "../../repositories";
import { ConstantApi } from "features/repositories";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as RoutSelector from "redux/rout/selector";
import { getCurrentUser } from "helpers/Utils";
import CustomButton from "features/components/common/CustomButton";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useQuery } from "react-query";
import CustomFromLabel from "features/components/common/CustomFromLabel";

const RelationRegister = (props) => {
  const currentUser = getCurrentUser();
  const { relation, intl, onCallBack, routs } = props;
  const [isSaving, setIsSaving] = React.useState(false);
  const { messages } = intl;
  const schema = yup.object().shape({
    name: yup
      .string()
      .required(`${messages["profile.firstname"]} ${messages["not.entered"]}`),
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

  const {
    data: typeSupports,
    isLoading: isLoadingTypeSupports,
    error: errorTypeSupports,
  } = useQuery(
    "TypeSupport",
    () =>
      ConstantApi.Get({ target: "TypeSupportDonate2" })
        .apply()
        .then((res) => {
          return res.data.map((item) => {
            return { label: item.title, value: item.id };
          });
        }),
    {}
  );

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
    if (relation) {
      setValue("id", relation.id);
      setValue("number", relation.number);
      setValue("name", relation.name);
      setValue("family", relation.family);
      setValue("mobile", relation.mobile);
      setValue("tel1", relation.tel1);
      setValue("address", relation.address);
      setValue("comment", relation.comment);
      var rout = routs.find((m) => m.id == relation.routId);
      if (rout)
        setValue("routId", { value: rout.id, label: rout.title });
      var typeSupport = typeSupports.find(
        (m) => m.value == relation.typeSupport
      );
      if (typeSupport) setValue("typeSupport", typeSupport);
    }
  }, [relation, typeSupports]);

  const saveFund = (data) => {
    const body = {
      ...data,
      id: data.id ?? 0,
      target: "Donation2",
      typeSupport: data.typeSupport.value,
      routId: data.routId.value,
      agentId: currentUser.id,
    };
    setIsSaving(true);
    var api = BakerRelationApi.Post(body).apply();
    api.then((res) => {
      onCallBack(true, res.data);
      setIsSaving(false);
    });
  };

  const onSubmit = (data) => {
    if (!isSaving) saveFund(data);
  };
  return (
    <Row>
      <Colxx xxs="12" xl="12">
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
                  <Colxx sm="12" md="6" lg="6">
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
                  <Colxx xs="6" md="6">
                    <CustomFromLabel label="profile.type.supports">
                      <Controller
                        name="typeSupport"
                        control={control}
                        render={({ field }) => (
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            {...field}
                            options={isLoadingTypeSupports ? [] : typeSupports}
                            placeholder=""
                          />
                        )}
                      />
                    </CustomFromLabel>
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
                <Colxx xxs="12" className="mt-1 btn-row">
                  <CustomButton
                    label={"submit.change"}
                    btnClass="primary"
                    child={<CheckRoundedIcon color="lignt" fontSize="small" />}
                    onClick={() => handleSubmit(onSubmit)()}
                  />
                </Colxx>
              </>
            </form>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = (state, { targets }) => {
  const routs = RoutSelector.selectItemsSearch(state, 0, "Donation2");
  return {
    routs,
  };
};

export default injectIntl(connect(mapStateToProps, {})(RelationRegister));
