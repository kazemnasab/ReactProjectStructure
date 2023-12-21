import * as React from "react";
import { Row, Card, CardBody, Input, Label, FormGroup } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";
import DatePickInput from "features/components/common/DatePickInput";
import moment from "jalali-moment";

import Select from "react-select";
import * as RoutSelector from "redux/rout/selector";
import * as Region1Selector from "redux/region1/selector";
import { Colxx, Separator } from "features/components/bootstrap/CustomBootstrap";
import { useForm, Controller } from "react-hook-form";

import IntlMessages from "helpers/IntlMessages";
import { BakerRelationApi } from "../../repositories";
import CustomFromLabel from "features/components/common/CustomFromLabel";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";

const SearchDialog = ({
  item,
  intl,
  warehouses,
  onCallBack,
  region1s,
  routs,
}) => {
  const { messages } = intl;
  const [relations, setRelations] = React.useState([]);
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
  React.useEffect(() => {
    BakerRelationApi.Get({ target: "Donation2" })
      .apply()
      .then((res) => {
        setRelations([
          { label: "بدون رابط", value: 0, key: 0 },
          ...res.data.map((item) => {
            var reg = region1s.find((m) => m.id == item.reg1Id);
            return {
              label: item.name + " - " + (reg ? reg.code : ""),
              value: item.id,
              key: item.id,
            };
          }),
        ]);
      });
  }, []);
  React.useEffect(() => {
    setValue("utime1", null);
    setValue("utime2", null);
    if (item != null) openEditing(item);
  }, [relations]);

  const openEditing = (item) => {
    Object.keys(item).forEach((element) => {
      setValue(element, item[element]);
    });
    if (item.relationId) {
      var relation = relations.find((m) => m.value == item.relationId);
      if (relation) setValue("relationId", relation);
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

  const onSubmit = (data) => {
    var body = {};
    Object.keys(data).forEach((element) => {
      if (data[element]) body = { ...body, [element]: data[element] };
    });
    if (body.relationId) body = { ...body, relationId: body.relationId.value };
    if (body.utime1)
      body = {
        ...body,
        utime: moment(body.utime1 ?? null)
          .locale("fa")
          .format("YYYY/MM/DD"),
      };
    else if (body.utime) var { utime, ...body } = body;
    if (body.hasBankNumber)
      body = { ...body, hasBankNumber: body.hasBankNumber.value };

    onCallBack(true, body);
  };

  return (
    <>
      <Row>
        <Colxx xxs="12" xl="12" className="mb-4">
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
                          name="relationId"
                          control={control}
                          render={({ field }) => (
                            <Select
                              className="react-select"
                              classNamePrefix="react-select"
                              isClearable={true}
                              name="form-field-name"
                              {...field}
                              options={relations}
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
                  </Row>
                  <Colxx xxs="12" style={{ text_align: "end" }}>
                    <IconButton
                      title={messages["submit.change"]}
                      onClick={() => handleSubmit(onSubmit)()}
                    >
                      <CheckRoundedIcon color="info" />
                    </IconButton>
                    {"  "}
                    <IconButton
                      title={messages["app.sheet.factor.cancel"]}
                      onClick={() => {
                        onCallBack(false, null);
                      }}
                    >
                      <CloseRoundedIcon style={{ color: "red" }} />
                    </IconButton>
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

const mapStateToProps = (state) => {
  const routs = RoutSelector.selectItemsSearch(state, 0, "");
  const region1s = Region1Selector.selectItemsSearch(state, "");
  return {
    routs,
    region1s,
  };
};

export default injectIntl(connect(mapStateToProps, {})(SearchDialog));
