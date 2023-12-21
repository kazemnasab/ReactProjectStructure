import React, { useEffect, useState } from "react";
import { Row, Card, CardBody, Input, Label, Button } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import Select from "react-select";

import { Colxx, Separator } from "features/components/bootstrap/CustomBootstrap";
import { useForm, Controller } from "react-hook-form";

import IntlMessages from "helpers/IntlMessages";
import { BakerSupportedApi } from "../../repositories";
import { ConstantApi } from "features/repositories";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as RoutSelector from "redux/rout/selector";
import { getCurrentUser } from "helpers/Utils";
import CustomButton from "features/components/common/CustomButton";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useQuery } from "react-query";
import CustomFromLabel from "features/components/common/CustomFromLabel";
import DatePickInput from "features/components/common/DatePickInput";
import moment from "jalali-moment";

const SupportedRegister = (props) => {
  const currentUser = getCurrentUser();
  const { supported, intl, onCallBack, relationId } = props;
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
    data: bakerSupportedStates,
    isLoading: isLoadingBakerSupportedState,
    error: errorBakerSupportedState,
  } = useQuery(
    "BakerSupportedState",
    () =>
      ConstantApi.Get({ target: "BakerSupportedState" })
        .apply()
        .then((res) => {
          return res.data.map((item) => {
            return { label: item.title, value: item.id };
          });
        }),
    {}
  );

  useEffect(() => {
    if (supported) {
      setValue("id", supported.id);
      setValue("number", supported.number);
      setValue("name", supported.name);
      setValue("family", supported.family);
      setValue("mobile", supported.mobile);
      setValue("tel1", supported.tel1);
      setValue("address", supported.address);
      setValue("bakerRelationId", supported.bakerRelationId);
      setValue("countMember", supported.countMember);
      const persianDate = moment(supported.birth, "jYYYY/jM/jD"); // Parse the input date string
      const gregorianDate = persianDate.toDate();
      setValue("birth", gregorianDate);
      setValue("bankNumber", supported.bankNumber);
      if (bakerSupportedStates && bakerSupportedStates.length > 0) {
        var state = bakerSupportedStates.find(
          (m) => m.value == supported.stateId
        );
        if (state) setValue("stateId", state);
      }
    } else {
      if (bakerSupportedStates && bakerSupportedStates.length > 0)
        setValue("stateId", bakerSupportedStates[0]);
      setValue("birth", new Date());
    }
  }, [supported, bakerSupportedStates]);

  const saveFund = (data) => {
    const body = {
      ...data,
      bakerRelationId: data.bakerRelationId ?? relationId,
      id: data.id ?? 0,
      stateId: data.stateId.value,
      birth: moment(data.birth ?? null)
        .locale("fa")
        .format("YYYY/MM/DD"),
    };
    //console.log(data);
    //return;
    setIsSaving(true);
    var api = BakerSupportedApi.Post(body);
    if (body.id) api = BakerSupportedApi.PatchList([body]);
    api.apply().then((res) => {
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

                  <Colxx xs="6" md="6">
                    <CustomFromLabel label="profile.lastname">
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
                    </CustomFromLabel>
                  </Colxx>
                  <Colxx xs="6" md="6">
                    <CustomFromLabel label="profile.number">
                      <Controller
                        name="number"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                      />
                      {errors.number ? (
                        <div className="invalid-feedback d-block">
                          {errors.number.message}
                        </div>
                      ) : null}
                    </CustomFromLabel>
                  </Colxx>
                  <Colxx sm="12" md="4" lg="6">
                    <CustomFromLabel label="profile.birth">
                      <Controller
                        name="birth"
                        control={control}
                        render={({ field }) => <DatePickInput {...field} />}
                      />
                    </CustomFromLabel>
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
                  <Colxx xs="6" md="6">
                    <CustomFromLabel label="profile.state">
                      <Controller
                        name="stateId"
                        control={control}
                        render={({ field }) => (
                          <Select
                            defaultValue={isLoadingBakerSupportedState[0]}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            {...field}
                            options={
                              isLoadingBakerSupportedState
                                ? []
                                : bakerSupportedStates
                            }
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
                  <Colxx sm="12" md="6" lg="6">
                    <Label className="form-group has-float-label">
                      <span>
                        <IntlMessages id="profile.bankNumber" />
                      </span>
                      <Controller
                        name="bankNumber"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                      />
                    </Label>
                  </Colxx>
                  <Colxx sm="12" md="6" lg="6">
                    <Label className="form-group has-float-label">
                      <span>
                        <IntlMessages id="profile.countMember" />
                      </span>
                      <Controller
                        name="countMember"
                        control={control}
                        render={({ field }) => (
                          <Input type="number" min={1} {...field} />
                        )}
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
  const routs = RoutSelector.selectItemsSearch(state, 0, "");
  return {
    routs,
  };
};

export default injectIntl(connect(mapStateToProps, {})(SupportedRegister));
