import * as React from "react";
import { injectIntl } from "react-intl";
import FundRegister from "features/app/agent/fund/components/FundRegister";
import BillRegister from "features/app/agent/bill/components/BillRegister";

const MainDialogSwitcher = (props) => {
  const { intl, page, isOpen, title, onCallBack } = props;
  //console.log(props);
  if (page == "FundRegister") return <FundRegister {...props} onCallBack={onCallBack} />;
  if (page == "BillRegister") return <BillRegister {...props} onCallBack={onCallBack} />;
  return <></>;
};

export default injectIntl(MainDialogSwitcher);
