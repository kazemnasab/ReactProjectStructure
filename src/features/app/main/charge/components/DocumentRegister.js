import React, { useEffect, useState } from "react";
import { Row, Card, CardBody, Input, Label, Button, Col } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import Select from "react-select";

import { Colxx, Separator } from "features/components/bootstrap/CustomBootstrap";
import { useForm, Controller } from "react-hook-form";

import IntlMessages from "helpers/IntlMessages";
import { BakerRelationApi, BakerSupportedChargeApi } from "../../repositories";
import { ConstantApi } from "features/repositories";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as RoutSelector from "redux/rout/selector";
import * as Region1Selector from "redux/region1/selector";
import { getCurrentUser } from "helpers/Utils";
import CustomButton from "features/components/common/CustomButton";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useQuery } from "react-query";
import CustomFromLabel from "features/components/common/CustomFromLabel";
import DatePickInput from "features/components/common/DatePickInput";
import moment from "jalali-moment";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from "@mui/material";
import { da } from "date-fns-jalali/locale";

const DocumentRegister = (props) => {
  const currentUser = getCurrentUser();
  const { item = null, id = 0, intl, onCallBack, relationId, region1s } = props;
  const [document, setDocument] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [partners, setPartners] = React.useState([]);
  const { messages } = intl;
  const schema = yup.object().shape({
    serial: yup
      .string()
      .required(`${messages["profile.firstname"]} ${messages["not.entered"]}`),
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const {
    data: dsRelations,
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

  const {
    data: chargeDocumentType,
    isLoading: isLoadingChargeDocumentType,
    error: errorChargeDocumentType,
  } = useQuery(
    "ChargeDocumentType",
    () =>
      ConstantApi.Get({ target: "ChargeDocumentType" })
        .apply()
        .then((res) => {
          return res.data.map((item) => {
            return { label: item.title, value: item.id };
          });
        }),
    {}
  );

  useEffect(() => {
    if (id > 0) {
      BakerSupportedChargeApi.GetDocument(id).apply().then(res => {
        setDocument(res.data);
        setPartners(res.data.partners);
      });
    }
  }, [id]);

  useEffect(() => {
    console.log(document);
    if (document) {
      setValue("id", document.id);
      setValue("title", document.title);
      setValue("serial", document.serial);
      setValue("comment", document.comment);
      setValue("dateCharge", document.dateCharge);
    }
  }, [document]);

  const saveDocument = (data) => {
    var body = {
      ...data,
      partners: partners.map(m => { return { ...m, documentId: data.id }; })
    };
    console.log(body);
    setIsSaving(true);
    var api = BakerSupportedChargeApi.UpdateDocument(body);
    api.apply().then((res) => {
      onCallBack(true, res.data);
      setIsSaving(false);
    });
  };


  function handleEditDocument(index, data) {
    console.log(partners);
    const ps = partners.map((document, i) => {
      if (i === index) {
        // Increment the clicked counter
        return { ...document, ...data };
      } else {
        // The rest haven't changed
        return document;
      }
    });
    console.log(ps);
    setPartners(ps);
  }

  const onSubmit = (data) => {
    console.log(data);
    if (!isSaving) saveDocument(data);
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
                        <IntlMessages id="app.main.cost.charge.serial" />
                      </span>
                      <Controller
                        name="serial"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                      />
                      {errors.serial ? (
                        <div className="invalid-feedback d-block">
                          {errors.serial.message}
                        </div>
                      ) : null}
                    </Label>
                  </Colxx>
                  <Colxx sm="12" md="4" lg="6">
                    <CustomFromLabel label="app.main.cost.charge.date">
                      <Controller
                        name="dateCharge"
                        control={control}
                        render={({ field }) => <DatePickInput {...field} />}
                      />
                    </CustomFromLabel>
                  </Colxx>
                  <Colxx xs="12" md="12">
                    <CustomFromLabel label="comment">
                      <Controller
                        name="comment"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                      />
                    </CustomFromLabel>
                  </Colxx>


                </Row>
                <Row>
                  <hr />
                  <Col md={3}>
                    <Label>
                      <IntlMessages id={"app.main.cost.charge.partner"} />
                      <IconButton
                        size="large"
                        onClick={() => {
                          setPartners([...partners, { id: 0 }]);
                        }}
                        title={messages["add"]}
                      >
                        <AddIcon color="info" fontSize="12" />
                      </IconButton>
                    </Label>
                  </Col>
                  <Col md={1}>

                  </Col>

                  {
                    partners.map((partner, index) => {
                      if (partner.deleted)
                        return <></>;
                      return <Row>
                        <Col md={6}>
                          <CustomFromLabel label="app.main.cost.relation">
                            <Select
                              className="react-select"
                              classNamePrefix="react-select"
                              name="form-field-name"
                              value={dsRelations.find(m => m.value == partner.partnerId)}
                              options={isLoadingRelations ? [] : dsRelations}
                              placeholder=""
                              onChange={(e) => handleEditDocument(index, { partnerId: e.value })}
                            />
                          </CustomFromLabel>
                        </Col>
                        <Col md={5} sm={5}>
                          <CustomFromLabel label="app.main.cost.charge.price">
                            <Input value={partner.price} onChange={(e) => handleEditDocument(index, { price: e.target.value })} />
                          </CustomFromLabel>
                        </Col>
                        <Col md={1}>
                          <IconButton
                            size="xs"
                            onClick={() => {
                              handleEditDocument(index, { deleted: true });
                            }}
                            title={messages["add"]}
                          >
                            <RemoveIcon color="red" fontSize="12" />
                          </IconButton>
                        </Col>

                      </Row>;
                    })
                  }
                </Row>
                <Colxx xxs="12" className="mt-1 btn-row">
                  <CustomButton
                    label={"submit.change"}
                    btnClass="primary"
                    child={<CheckRoundedIcon color="lignt" fontSize="small" />}
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
  const region1s = Region1Selector.selectItemsSearch(state, "");
  return {
    routs,
    region1s
  };
};

export default injectIntl(connect(mapStateToProps, {})(DocumentRegister));
