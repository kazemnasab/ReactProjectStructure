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
import { BakerSupportedChargeApi } from "../../repositories";

import CustomFromLabel from "features/components/common/CustomFromLabel";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CustomButton from "features/components/common/CustomButton";

const ChargeAction = ({ items, intl, onCallBack }) => {
  const { messages } = intl;
  const [isSaving, setIsSaving] = React.useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({});

  React.useEffect(() => {
    console.log(items);
    setValue(
      "serial",
      parseInt(moment(new Date()).locale("fa").format("YYYYMMDD"))
    );
  }, []);

  const onSubmit = (data) => {
    const body = items.map((item) => {
      return {
        ...item,
        price:
          parseInt(data.price0 ?? 0) +
          parseInt(data.price1 ?? 0) * item.countMember,
      };
    });
    setIsSaving(true);
    BakerSupportedChargeApi.PostList(body, data.serial)
      .apply()
      .then((res) => {
        setIsSaving(true);
        onCallBack(true, null);
      });
    //onCallBack(true, data);
  };

  return (
    <Row>
      <Colxx xxs="12" xl="12">
        <Card>
          <CardBody>
            <form
              onSubmit={handleSubmit((data) => {})}
              onKeyDown={(e) => {
                if (e.keyCode == 13) e.preventDefault();
              }}
            >
              <>
                <Row>
                  <Colxx sm="12" md="4" lg="4">
                    <CustomFromLabel label="app.main.cost.charge.serial">
                      <Controller
                        name="serial"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                      />
                    </CustomFromLabel>
                  </Colxx>
                  <Colxx sm="12" md="4" lg="4">
                    <CustomFromLabel label="app.main.cost.charge.price0">
                      <Controller
                        name="price0"
                        control={control}
                        render={({ field }) => (
                          <Input type="number" {...field} />
                        )}
                      />
                    </CustomFromLabel>
                  </Colxx>
                  <Colxx sm="12" md="4" lg="4">
                    <CustomFromLabel label="app.main.cost.charge.price1">
                      <Controller
                        name="price1"
                        control={control}
                        render={({ field }) => (
                          <Input type="number" {...field} />
                        )}
                      />
                    </CustomFromLabel>
                  </Colxx>
                </Row>
                <Colxx xxs="12" className="mt-1 btn-row">
                  <CustomButton
                    label={"request.registration"}
                    btnClass="primary"
                    loading={isSaving}
                    child={<CheckRoundedIcon color="lignt" fontSize="small" />}
                    onClick={() => handleSubmit(onSubmit)()}
                  />
                  {"   "}
                  <CustomButton
                    label="cancel.change"
                    btnClass="label-danger"
                    child={<CloseRoundedIcon color="lignt" fontSize="small" />}
                    onClick={() => {
                      if (!isSaving) onCallBack(false, null);
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

export default injectIntl(connect(mapStateToProps, {})(ChargeAction));
