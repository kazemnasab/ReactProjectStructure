import IntlMessages from "helpers/IntlMessages";
import React from "react";
import { injectIntl } from "react-intl";
import { Card, CardBody } from "reactstrap";

import { useParams } from "react-router-dom";
import { BakerSupportedApi } from "features/repositories";
import { FundApi } from "features/repositories";

const Index = ({ intl, stateId = 1 }) => {
  const { id } = useParams();
  const [items, setItems] = React.useState([]);
  const [relation, setRelation] = React.useState([]);
  React.useEffect(() => {
    BakerSupportedApi.Get({ relationId: id, stateId: 5 }).apply().then(res => {
      setItems(res.data);
      FundApi.GetById(id).apply().then(m => {
        setRelation(m.data);
      });
    });
  }, []);
  const printRef = React.useRef();

  return (
    <div ref={printRef} id="main" class="invoice-print p-1">
      <div class="d-flex justify-content-between flex-row">
        <div style={{
          width: '100%', textAlign: 'center'
        }}>
          <h3 class="app-brand-text h3 mb-0 fw-bold">شبکه سراسری خیرات نان</h3>
          <p class="mb-1">رسید تحویل کارت های بانکی</p>

        </div>
      </div>


      <hr />
      <div class="table-responsive" style={{ width: '21cm' }}>
        
        <table class="table border-top m-0">
          
          <thead>
            <tr>
              <th span="1">#</th>
              <th span="2">نام</th>
              <th span="1">کد ملی</th>
              <th span="2">شماره کارت</th>
              <th colspan="3">توضیحات و امضاء صاحب کارت</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return <tr style={{height:'2cm'}}> 
              <th span="1">{index+1}</th>
              <td span="2">{item.name+' '+item.family}</td>
              <td span="1">{item.number}</td>
              <td span="2">{item.bankNumber}</td>
              <td span="3"></td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>

      <div class="row">
        <div class="col-12 lh-1-85 mt-3">
          <span class="fw-semibold">امضاء تحویل گیرنده: </span>
        </div>
      </div>
    </div>
  );
};
export default injectIntl(Index);
