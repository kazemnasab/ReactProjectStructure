import * as React from "react";
import { injectIntl } from "react-intl";
import SaleServiceEdit from "features/components/saleservice/sheet/SaleServiceEdit";
import PayEdit from "features/components/financial/pay/Edit";
import KardexItem from "features/components/saleservice/kardex/Edit";
import ReceiveEdit from "features/components/financial/receive/Edit";
import SaleServiceKardex from "features/components/saleservice/factorItem/Edit";
import FactorItem from "features/components/saleservice/factorItem/Edit";
import WaitingList from "features/components/saleservice/ordersegmant/WaitingList";
import SegmentOrderEdit from "features/components/saleservice/ordersegmant/EditItem";
import ListSimple from "features/components/saleservice/factorItem/ListSimple";
import ProfileSelect from "features/components/profile/ProfileSelect";
import FactorBottom from "features/components/saleservice/factor/FactorBottom";
import ProductSelectByName from "features/components/catalog/ProductSelectByName";

const TabContentSwitcher = (props) => {
  const { intl, page, isOpen, title, onCallBack } = props;
  //console.log(props);FactorItems
  if (page == "SaleServiceEdit")
    return <SaleServiceEdit {...props} onCallBack={onCallBack} />;
  if (page == "PayEdit") return <PayEdit {...props} onCallBack={onCallBack} />;
  if (page == "FactorItem")
    return <FactorItem {...props} onCallBack={onCallBack} />;
  if (page == "KardexItem")
    return <KardexItem {...props} onCallBack={onCallBack} />;
  if (page == "SaleServiceKardex")
    return <SaleServiceKardex {...props} onCallBack={onCallBack} />;
  if (page == "ReceiveEdit")
    return <ReceiveEdit {...props} onCallBack={onCallBack} />;
  if (page == "SegmentOrderWating")
    return <WaitingList {...props} onCallBack={onCallBack} />;
  if (page == "SegmentOrderEdit")
    return <SegmentOrderEdit {...props} onCallBack={onCallBack} />;
  if (page == "FactorItems")
    return <ListSimple {...props} onCallBack={onCallBack} />;
  if (page == "FactorBottom")
    return <FactorBottom {...props} onCallBack={onCallBack} />;
  if (page == "CustomerSelect")
    return <ProfileSelect {...props} onCallBack={onCallBack} />;
  if (page == "ProductSelectByName")
    return <ProductSelectByName {...props} onCallBack={onCallBack} />;
  return <></>;
};

export default injectIntl(TabContentSwitcher);
