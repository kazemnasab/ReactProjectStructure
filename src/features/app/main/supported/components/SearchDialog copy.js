import * as React from "react";
import { Row, Card, CardBody, Input, Label, FormGroup } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";
import DatePickInput from "features/components/common/DatePickInput";
import moment from "jalali-moment";
import { useQuery } from "react-query";

import Select from "react-select";
import * as RoutSelector from "redux/rout/selector";
import * as Region1Selector from "redux/region1/selector";
import { Colxx, Separator } from "features/components/bootstrap/CustomBootstrap";
import { useForm, Controller } from "react-hook-form";

import IntlMessages from "helpers/IntlMessages";
import { BakerRelationApi, ConstantApi, Region1Api } from "../../repositories";
import CustomFromLabel from "features/components/common/CustomFromLabel";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import CustomButton from "features/components/common/CustomButton";

const SearchDialog = ({
  item,
  intl,
  warehouses,
  onCallBack,
  region1s,
  routs,
}) => {
  const { messages } = intl;
  const [stateHas, setStateHase] = React.useState([
    {
      label: "has",
      value: true,
    },
    {
      label: "has.not",
      value: false,
    },
  ]);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({});

  const openEditing = (item) => {
    Object.keys(item).forEach((element) => {
      setValue(element, item[element]);
    });
    console.log(item);
    if (item.relationFilter) {
      if (item.relationFilter.ids)
        setValue(
          "relations",
          item.relationFilter.ids.map((id) => {
            var relation = relations.find((m) => m.key == id);
            return relation;
          })
        );
      if (item.relationFilter.typeSupports)
        setValue(
          "typeSupports",
          item.relationFilter.typeSupports.map((id) => {
            return typeSupports.find((m) => m.value == id);
          })
        );
      if (item.relationFilter.reg1Ids)
        setValue(
          "reg1Ids",
          item.relationFilter.reg1Ids.map((id) => {
            var reg = region1s.find((m) => m.id == id);
            return { label: reg.code, value: reg.id, key: reg.id };
          })
        );
    }
    if (item.states) {
      setValue(
        "states",
        item.states.map((id) => {
          var state = bakerSupportedStates.find((m) => m.value == id);
          return state;
        })
      );
    }
    if (item.hasBankNumber) {
      var hasBankNumber = stateHas
        .map((item) => {
          return {
            ...item,
            label: messages[item.label],
          };
        })
        .find((m) => m.value == item.hasBankNumber);
      if (hasBankNumber) setValue("hasBankNumber", hasBankNumber);
    }
  };

  const {
    data: relations,
    isLoading: isLoadingRelations,
    error: errorRelations,
  } = useQuery(
    "Relations",
    () =>
      BakerRelationApi.Get({ target: "Donation2", stateId: 5 })
        .apply()
        .then((res) => {
          return [
            { label: "بدون رابط", value: 0, key: 0 },
            ...res.data.map((item) => {
              var reg = region1s.find((m) => m.id == item.reg1Id);
              return {
                label: item.name + " - " + (reg ? reg.code : ""),
                value: item.id,
                key: item.id,
              };
            }),
          ];
        }),
    {}
  );

  React.useEffect(() => {
    setValue("chargeDate1", null);
    setValue("chargeDate2", null);
    setValue("utime1", null);
    setValue("utime2", null);
    if (item != null) openEditing(item);
  }, [relations]);

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

  const {
    data: bakerSupportedChargeStates,
    isLoading: isLoadingBakerSupportedChargeStates,
    error: errorBakerSupportedChargeStates,
  } = useQuery(
    "BakerSupportedCardexTarget",
    () =>
      ConstantApi.Get({ wtarget: "LogSupported" })
        .apply()
        .then((res) => {
          return res.data.map((item) => {
            return { label: item.title, value: item.id };
          });
        }),
    {}
  );

  const {
    data: bakerSupportedCardexTargets,
    isLoading: isLoadingBakerSupportedCardexTargets,
    error: errorBakerSupportedCardexTargets,
  } = useQuery(
    "BakerSupportedCharge",
    () =>
      ConstantApi.Get({ target: "BakerSupportedCharge" })
        .apply()
        .then((res) => {
          return res.data.map((item) => {
            return { label: item.title, value: item.id };
          });
        }),
    {}
  );

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


  const getRelationFilter = (data) => {
    var relationFilter = {};
    Object.keys(data).forEach((element) => {
      if (data[element]) {
        if (element == "relations" && data.relations.map((m) => m.value).length > 0)
          relationFilter = {
            ...relationFilter,
            ids: data.relations.map((m) => m.value)
          };
        else if (element == "reg1Ids" && data.reg1Ids.map((m) => m.value).length > 0)
          relationFilter = {
            ...relationFilter,
            reg1Ids: data.reg1Ids.map((m) => m.value)
          };
        else if (element == "typeSupports" && data.typeSupports.map((m) => m.value).length > 0)
          relationFilter = {
            ...relationFilter,
            typeSupports: data.typeSupports.map((m) => m.value)
          };
      }
    });
    return Object.keys(relationFilter).length > 0 ? relationFilter : null;
  }

  const getChargeFilter = (data) => {
    var chargeFilter = {};
    Object.keys(data).forEach((element) => {
      if (data[element]) {
        if (element == "chargeStates" && data.chargeStates.map((m) => m.value).length > 0)
          chargeFilter = {
            ...chargeFilter,
            states: data.chargeStates.map((m) => m.value)
          };
        else if (element == "chargeDate1")
          chargeFilter = {
            ...chargeFilter,
            dateReg1: moment(data.chargeDate1 ?? null)
              .locale("fa")
              .format("YYYY/MM/DD")
          };
        else if (element == "chargeDate2")
          chargeFilter = {
            ...chargeFilter,
            dateReg2: moment(data.chargeDate2 ?? null)
              .locale("fa")
              .format("YYYY/MM/DD")
          };
      }
    });
    return Object.keys(chargeFilter).length > 0 ? chargeFilter : null;
  }

  const onSubmit = (data) => {
    var supportedFilter = {};
    var relationFilter = getRelationFilter(data);
    if (relationFilter)
      supportedFilter = { relationFilter: relationFilter };
    var chargeFilter = getChargeFilter(data);
    if (chargeFilter)
      supportedFilter = { chargeFilter: chargeFilter };

    Object.keys(data).forEach((element) => {
      if (data[element]) {
        if (element == "relations" || element == "reg1Ids" || element == "typeSupports");
        if (element == "chargeStates" || element == "chargeDate1" || element == "chargeDate2");
        else if (element == "states")
          supportedFilter = { ...supportedFilter, states: data.states.map((st) => st.value) };
        else if (element == "utime1")
          supportedFilter = {
            ...supportedFilter,
            utime: moment(data.utime1 ?? null)
              .locale("fa")
              .format("YYYY/MM/DD"),
          };
        else if (element == "hasBankNumber")
          supportedFilter = { ...supportedFilter, hasBankNumber: data.hasBankNumber.value };
        else if (element != "relationFilter")
          supportedFilter = { ...supportedFilter, [element]: data[element] };
      }
    });
    console.log(supportedFilter);
    onCallBack(true, supportedFilter);
  };

  const onSubmit1 = (data) => {
    var supportedFilter = {};
    var relationFilter = {};
    Object.keys(data).forEach((element) => {
      if (data[element]) {
        if (element == "relations")
          supportedFilter = {
            ...supportedFilter,
            relationFilter: supportedFilter.relationFilter
              ? {
                ...supportedFilter.relationFilter,
                ids: data.relations.map((m) => m.value),
              }
              : { ids: data.relations.map((m) => m.value) },
          };
        else if (element == "reg1Ids")
          supportedFilter = {
            ...supportedFilter,
            relationFilter: supportedFilter.relationFilter
              ? {
                ...supportedFilter.relationFilter,
                reg1Ids: data.reg1Ids.map((m) => m.value),
              }
              : { reg1Ids: data.reg1Ids.map((m) => m.value) },
          };
        else if (element == "typeSupports")
          supportedFilter = {
            ...supportedFilter,
            relationFilter: supportedFilter.relationFilter
              ? {
                ...supportedFilter.relationFilter,
                typeSupports: data.typeSupports.map((m) => m.value),
              }
              : { typeSupports: data.typeSupports.map((m) => m.value) },
          };
        else if (element == "states")
          supportedFilter = { ...supportedFilter, states: data.states.map((st) => st.value) };
        else if (element == "utime1")
          supportedFilter = {
            ...supportedFilter,
            utime: moment(data.utime1 ?? null)
              .locale("fa")
              .format("YYYY/MM/DD"),
          };
        else if (element == "hasBankNumber")
          supportedFilter = { ...supportedFilter, hasBankNumber: data.hasBankNumber.value };
        else if (element != "relationFilter")
          supportedFilter = { ...supportedFilter, [element]: data[element] };
      }
    });
    //console.log(supportedFilter);
    onCallBack(true, supportedFilter);
  };

  return (
    <Row>
      <Colxx xxs="12" xl="12">
        <Card>
          <CardBody>
            <form
              onSubmit={handleSubmit(onSubmit)}
              defaultValue={item}
              onKeyDown={(e) => {
                if (e.keyCode == 13) e.preventDefault();
              }}
            >
              <>
                <Row className="mb-2">
                  <Colxx sm="12" md="8" lg="8">
                    <CustomFromLabel label="profile.firstname">
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                      />
                    </CustomFromLabel>
                  </Colxx>
                  <Colxx sm="12" md="4" lg="4">
                    <CustomFromLabel label="profile.number">
                      <Controller
                        name="number"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                      />
                    </CustomFromLabel>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xs="12" md="12">
                    <CustomFromLabel label="app.main.cost.relation">
                      <Controller
                        name="relations"
                        control={control}
                        render={({ field }) => (
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            isMulti
                            isClearable={true}
                            name="form-field-name"
                            {...field}
                            options={isLoadingRelations ? [] : relations}
                            placeholder=""
                          />
                        )}
                      />
                    </CustomFromLabel>
                  </Colxx>
                  <Colxx xs="12" md="12">
                    <CustomFromLabel label="profile.reg1">
                      <Controller
                        name="reg1Ids"
                        control={control}
                        render={({ field }) => (
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            isMulti
                            isClearable={true}
                            name="form-field-name"
                            {...field}
                            options={region1s.map((item) => {
                              return {
                                label: item.code,
                                key: item.id,
                                value: item.id,
                              };
                            })}
                            placeholder=""
                          />
                        )}
                      />
                    </CustomFromLabel>
                  </Colxx>
                  <Colxx xs="12" md="12">
                    <CustomFromLabel label="profile.type.supports">
                      <Controller
                        name="typeSupports"
                        control={control}
                        render={({ field }) => (
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            isMulti
                            isClearable={true}
                            name="form-field-name"
                            {...field}
                            options={isLoadingTypeSupports ? [] : typeSupports}
                            placeholder=""
                          />
                        )}
                      />
                    </CustomFromLabel>
                  </Colxx>
                  <Colxx xs="12" md="4">
                    <CustomFromLabel label="profile.state">
                      <Controller
                        name="states"
                        control={control}
                        render={({ field }) => (
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            isClearable={true}
                            isMulti={true}
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
                  <Colxx sm="12" md="4" lg="4">
                    <CustomFromLabel label="submit.date.from">
                      <Controller
                        name="utime1"
                        control={control}
                        render={({ field }) => <DatePickInput {...field} />}
                      />
                    </CustomFromLabel>
                  </Colxx>
                  <Colxx xs="12" md="4">
                    <CustomFromLabel label="profile.bankNumber">
                      <Controller
                        name="hasBankNumber"
                        control={control}
                        render={({ field }) => (
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            isClearable={true}
                            name="form-field-name"
                            {...field}
                            options={stateHas.map((item) => {
                              return {
                                ...item,
                                label: messages[item.label],
                              };
                            })}
                            placeholder=""
                          />
                        )}
                      />
                    </CustomFromLabel>
                  </Colxx>
                  
                  <hr className="mt-2"/>
                  <Colxx xs="12" md="4">
                    <CustomFromLabel label="app.main.cost.charge.state">
                      <Controller
                        name="cardexTargets"
                        control={control}
                        render={({ field }) => (
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            isClearable={true}
                            name="form-field-name"
                            {...field}
                            options={isLoadingBakerSupportedCardexTargets ? [] : bakerSupportedCardexTargets}
                            placeholder=""
                          />
                        )}
                      />
                    </CustomFromLabel>
                  </Colxx>
                  <hr className="mt-2"/>
                  <Colxx xs="12" md="4">
                    <CustomFromLabel label="app.main.cost.charge.state">
                      <Controller
                        name="chargeStates"
                        control={control}
                        render={({ field }) => (
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            isMulti
                            isClearable={true}
                            name="form-field-name"
                            {...field}
                            options={isLoadingBakerSupportedChargeStates ? [] : bakerSupportedChargeStates}
                            placeholder=""
                          />
                        )}
                      />
                    </CustomFromLabel>
                  </Colxx>
                  <Colxx sm="12" md="4" lg="4">
                    <CustomFromLabel label="date.from">
                      <Controller
                        name="chargeDate1"
                        control={control}
                        render={({ field }) => <DatePickInput {...field} />}
                      />
                    </CustomFromLabel>
                  </Colxx>
                  <Colxx sm="12" md="4" lg="4">
                    <CustomFromLabel label="date.to">
                      <Controller
                        name="chargeDate2"
                        control={control}
                        render={({ field }) => <DatePickInput {...field} />}
                      />
                    </CustomFromLabel>
                  </Colxx>
                </Row>
                <Colxx xxs="12" className="mt-1 btn-row">
                  <CustomButton
                    label={"apply.filter"}
                    btnClass="primary"
                    child={<CheckRoundedIcon color="lignt" fontSize="small" />}
                    onClick={() => handleSubmit(onSubmit)()}
                  />
                  {"   "}
                  <CustomButton
                    label="cancel.change"
                    btnClass="label-danger"
                    child={<CloseRoundedIcon color="lignt" fontSize="small" />}
                    onClick={() => {
                      onCallBack(false, null);
                    }}
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

const mapStateToProps = (state) => {
  const routs = RoutSelector.selectItemsSearch(state, 0, "");
  const region1s = Region1Selector.selectItemsSearch(state, "");
  return {
    routs,
    region1s,
  };
};

export default injectIntl(connect(mapStateToProps, {})(SearchDialog));