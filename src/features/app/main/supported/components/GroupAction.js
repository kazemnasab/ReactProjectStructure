import * as React from "react";
import { Row, Card, CardBody, Input, Label, FormGroup } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";
import moment from "jalali-moment";
import { useQuery } from "react-query";
import Select from "react-select";
import * as Region1Selector from "redux/region1/selector";
import { Colxx, Separator } from "features/components/bootstrap/CustomBootstrap";
import { useForm, Controller } from "react-hook-form";

import { BakerRelationApi} from "../../repositories";
import { ConstantApi } from "features/repositories";
import CustomFromLabel from "features/components/common/CustomFromLabel";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CustomButton from "features/components/common/CustomButton";

const GroupAction = ({
  item,
  intl,
  onCallBack,
  region1s,
}) => {
  const { messages } = intl;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({});

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

  const [extraSupporters, setExtraSupporters] = React.useState([]);

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
          console.log(res.data);
          return res.data;
        }),
    {}
  );


  const onSubmit = (data) => {
    var body = {};
    Object.keys(data).forEach((element) => {
      if (data[element]) body = { ...body, [element]: data[element] };
    });
    if (body.bakerRelationId) body = { ...body, bakerRelationId: body.bakerRelationId.value };
    if (body.stateId) body = { ...body, stateId: body.stateId.value };
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
    if (extraSupporters.length > 0)
      body = { ...body, extraSupporters: extraSupporters };
    onCallBack(true, body);
  };

  const updateSupportedExtra = (categoryId, selected) => {
    var temp = extraSupporters.find(m => m.categoryId == categoryId && m.selected == selected);
    console.log(temp);
    if (temp == null) {
      temp = { categoryId: categoryId, selected: selected };
      setExtraSupporters([...extraSupporters.filter(m => m.categoryId != categoryId), temp]);
    } else
      setExtraSupporters([...extraSupporters.filter(m => m.categoryId != categoryId)]);
  }
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
                <Row>
                  <Colxx xs="12" md="12">
                    <CustomFromLabel label="replace,app.main.cost.relation">
                      <Controller
                        name="bakerRelationId"
                        control={control}
                        render={({ field }) => (
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
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

                  <Colxx xs="12" md="4">
                    <CustomFromLabel label="profile.state">
                      <Controller
                        name="stateId"
                        control={control}
                        render={({ field }) => (
                          <Select
                            className="react-select"
                            classNamePrefix="react-select"
                            isClearable={true}
                            name="form-field-name"
                            {...field}
                            options={
                              isLoadingBakerSupportedState
                                ? []
                                : bakerSupportedStates.map((item) => {
                                  return {
                                    label: item.title,
                                    value: item.id,
                                  };
                                })
                            }
                            placeholder=""
                          />
                        )}
                      />
                    </CustomFromLabel>
                  </Colxx>
                  <Colxx xs="12" md="4">
                    <CustomFromLabel label="عضو کمیته امداد">
                      <FormGroup className="mt-2" inline>
                        <Input
                          type="checkbox"
                          checked={extraSupporters.find(m => m.categoryId == 1 && m.selected == 1) != null}
                          onChange={(e) => {
                            updateSupportedExtra(1, 1);
                          }}
                        />
              {"  "}
                        <Label
                          onClick={() => updateSupportedExtra(1, 1)}
                          check
                        >
                          هست{"  "}
                        </Label>
                        {"   "}
                        <Input
                          type="checkbox"
                          checked={extraSupporters.find(m => m.categoryId == 1 && m.selected == 0) != null}
                          onChange={(e) => {
                            updateSupportedExtra(1, 0);
                          }}
                        />
              {"  "}
                        <Label
                          onClick={() => updateSupportedExtra(1, 0)}
                          check
                        >
                          نیست
                        </Label>
                      </FormGroup>
                    </CustomFromLabel>
                  </Colxx>
                  <Colxx xs="12" md="4">
                    <CustomFromLabel label="عضو بهزیستی">
                      <FormGroup className="mt-2" inline>
                        <Input
                          type="checkbox"
                          checked={extraSupporters.find(m => m.categoryId == 2 && m.selected == 1) != null}
                          onChange={(e) => {
                            updateSupportedExtra(2, 1);
                          }}
                        />
              {"  "}
                        <Label
                          onClick={() => updateSupportedExtra(2, 1)}
                          check
                        >
                          هست{"  "}
                        </Label>
                        {"   "}
                        <Input
                          type="checkbox"
                          checked={extraSupporters.find(m => m.categoryId == 2 && m.selected == 0) != null}
                          onChange={(e) => {
                            updateSupportedExtra(2, 0);
                          }}
                        />
              {"  "}
                        <Label
                          onClick={() => updateSupportedExtra(2, 0)}
                          check
                        >
                          نیست
                        </Label>
                      </FormGroup>
                    </CustomFromLabel>
                  </Colxx>
                </Row>
                <Colxx xxs="12" className="mt-1 btn-row">
                  <CustomButton
                    label={"apply.change"}
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
  const region1s = Region1Selector.selectItemsSearch(state, "");
  return {
    region1s,
  };
};

export default injectIntl(connect(mapStateToProps, {})(GroupAction));
