import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { Colxx, Separator } from "features/components/bootstrap/CustomBootstrap";
import DatePickInput from "features/components/common/DatePickInput";
import IntlMessages from "helpers/IntlMessages";
import moment from "jalali-moment";
import {
    Row,
    Card,
    CardBody,
    Input,
    Label,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";
import * as DonTypeSelector from "redux/dontype/selector";
import CustomDataGrid from "features/components/common/CustomDataGrid";
import { modalOpen, modalClose } from "redux/actions";
import { getCurrentUser } from "helpers/Utils";
import { BillApi, SerialApi } from "../../repositories";
import { listItemReducer } from "helpers/core";
import { IconButton } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GetAppIcon from '@mui/icons-material/GetApp';

var rowstyles = {
    width: '100%',
    '& .super-app-theme--0': {
      color: '#AA2323',
    },
    '& .super-app-theme--1': {
        color: '#333',
    },
    '& .super-app-theme--6': {
      bgcolor: '#08AF80',
      '&:hover': {
        bgcolor: '#FFF',
      },
    },
    '& .super-app-theme--10': {
      bgcolor: '#00D6D6',
      '&:hover': {
        bgcolor: '#FFF',
      },
    },
  };

const BillPage = (props) => {
    const currentUser = getCurrentUser();
    const {
        intl,
        modalOpenAction,
        modalCloseAction,
        dontypes
    } = props;
    const { messages } = intl;


    const [items, dispatchBillItems] = React.useReducer(listItemReducer, []);

    const [serial, setSerial] = React.useState(null);
    const [date, setDate] = React.useState(new Date());
    React.useEffect(() => {
        if (date)
            SerialApi.Get({ target: 'Donation1', date: moment(date).locale("fa").format("YYYY/MM/DD") }).apply().then((res) => setSerial(res.data));
    }, [date]);

    React.useEffect(() => {
        if (serial) {
            var api = BillApi.Get({ agentId: currentUser.id, serial: serial.number }).apply();
            api.then((res) => {
                console.log(res.data);
                dispatchBillItems({
                    type: "init",
                    new: res.data,
                    prev: null,
                    index: "insert",
                })
            });
        }
    }, [serial]);




    const openBill = React.useCallback(
        (serial, date) => {
            modalOpenAction({
                page: "BillRegister",
                title: ["app.donation.bill.edit"],
                size: "md",
                serial: serial.number,
                date: date,
                onCallBack: (close, res) => {
                    if (res)
                        dispatchBillItems({
                            type: "edit",
                            new: res,
                            prev: null,
                            index: "insert",
                        });
                    if (close)
                        modalCloseAction();
                },
            });
        },
        []
    );

    const columns = [
        {
            field: "billSerial",
            headerName: messages["app.bill.billserial"],
            width: 160,
            editable: true,
        }, {
            field: "price",
            headerName: messages["app.bill.price"],
            width: 100,
            editable: true,
            type:"number"
        }, , {
            field: "donTypeId",
            headerName: messages["app.bill.dontype"],
            width: 150,
            editable: true,
            valueGetter: (params) => {
                if (params.row.donTypeId) {
                    var cs = dontypes.find((m) => m.id == params.row.donTypeId);
                    if (cs) return cs.title;
                } else return params.row.routId + "";
            },
        },
        {
            field: "mobile",
            headerName: messages["profile.mobile"],
            type: "number",
            width: 110,
            editable: true,
        },
        {
            field: "date",
            headerName: messages["app.bill.date"],
            sortable: false,
            width: 100,
        },
    ];


    return (
        <>
            <Row className="mb-4">
                <Colxx xxs="6" md="2" lg="2">
                    <Label className="form-group has-float-label">
                        <span>
                            <IntlMessages id="app.bill.date" />
                        </span>
                        <DatePickInput
                            value={date}
                            onChange={(date) => {
                                setDate(date);
                            }}
                        />
                    </Label>
                </Colxx>
                <Colxx xxs="4" md="1" lg="1">
                      <Label className="form-group has-float-label">
                        <span>
                          <IntlMessages id="app.bill.serial" />
                        </span>
                        <Input value={serial? serial.number : ''} readOnly={true} />
                      </Label>
                    </Colxx>
                <Colxx xxs="2" md="2" lg="2" color="success">
                    <IconButton size="large" onClick={() => {
                        openBill(serial, moment(date).locale("fa").format("YYYY/MM/DD"));
                    }} title={messages["app.saleservice.fund.new"]}>
                        <AddOutlinedIcon color="info" fontSize="larg" />
                    </IconButton>
                    {""}
                </Colxx>
            </Row>
            <CustomDataGrid
                rowstyles={rowstyles}
                indexer_width={20}
                rows={items ?? []}
                columns={columns}
                pagination
                rowsPerPageOptions={[5]}
                pageSize={10}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                getRowClassName={(params) => `super-app-theme--${params.row.stateId}`}
            {...props}
            />
        </>
    );
};


const mapStateToProps = (state, { targets }) => {
    const dontypes = DonTypeSelector.selectItemsSearch(state, 0, "");
    return {
        dontypes
    };
};

export default injectIntl(
    connect(mapStateToProps, {
        modalOpenAction: modalOpen,
        modalCloseAction: modalClose,
    })(BillPage)
);