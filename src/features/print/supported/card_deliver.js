import React from "react";
import { injectIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { BakerSupportedApi } from "features/app/main/repositories";
import { RoutApi, Region1Api } from "features/repositories";
import { FundApi } from "features/app/agent/repositories";

const Index = ({ intl, stateId = 1 }) => {
  const { id } = useParams();
  const [items, setItems] = React.useState([]);
  const [relation, setRelation] = React.useState([]);
  const [rout, setRout] = React.useState(null);
  const [reg1, setReg1] = React.useState(null);
  React.useEffect(() => {
    BakerSupportedApi.Get({ relationId: id, stateId: 5 }).apply().then(res => {
      setItems(res.data);
      FundApi.GetById(id).apply().then(m => {
        setRelation(m.data);
        RoutApi.GetById(m.data.routId).apply().then(r => {
          setRout(r.data);
          Region1Api.GetById(r.data.reg1Id).apply().then(re => {
            setReg1(re.data);
          });
        });
      });
    });
  }, []);
  const printRef = React.useRef();

  return (
    <div ref={printRef} id="main" class="invoice-print p-5">
      <div class="table-responsive">
        <table class="table border-top m-0">
          <thead>
            <tr >
              <th colspan="13" style={{ textAlign: 'center' }}>
                <h2 style={{ margin: '0cm' }}>شبکه سراسری خیرات نان</h2>
                <h4 style={{ margin: '0cm' }}>کمیته امداد {reg1 ? reg1.code : ''}</h4>
              </th>
            </tr>
            <tr>
              <th style={{ textAlign: 'center' }} span="1">#</th>
              <th style={{ textAlign: 'center' }} span="2">نام و نام خانوادگی</th>
              <th style={{ textAlign: 'center' }} span="1">کد ملی</th>
              <th style={{ textAlign: 'center' }} span="2">شماره کارت</th>
              <th style={{ textAlign: 'center' }} colspan="7">توضیحات و امضاء صاحب کارت</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return <tr style={{ height: '2cm' }}>
                <th style={{ textAlign: 'center' }} span="1">{index + 1}</th>
                <td style={{ textAlign: 'center' }} span="2">{item.name + ' ' + item.family}</td>
                <td style={{ textAlign: 'center' }} span="1">{item.number}</td>
                <td style={{ textAlign: 'center' }} span="2">{item.bankNumber}</td>
                <td span="7"></td>
              </tr>;
            })}
          </tbody>

        </table>
      </div>
      <div class="table-responsive">
        <table class="table border-top m-0">
          <tbody>
            <tr style={{ height: '2cm' }}>
              <td colspan="3">
                مسئول اجرایی و ادای نذر
              </td><td colspan="3">
                مسئول اجرایی شبکه در استان
              </td>
            </tr>
            <tr style={{ height: '2cm' }}>
              <td colspan="3">
                مدیرکل کمیته امداد {reg1 ? reg1.code : ''}
              </td><td colspan="3">
                مدیرعامل شبکه
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default injectIntl(Index);
