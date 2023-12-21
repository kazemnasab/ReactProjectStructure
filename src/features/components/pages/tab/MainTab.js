import * as React from "react";
import { injectIntl } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";

import CustomContainerModal from "features/components/common/CustomContainerModal";
import MainTabSwitcher from "./MainTabSwitcher";

const MainTab = (props) => {
  const { dialogs } = props;
  return dialogs.map((item) => (
    <CustomContainerModal
      key={item.page}
      isOpen={true}
      title={item.title}
      {...item}
      {...props}
      toggle={() => {
        item.onCallBack(false, null);
      }}
    >
      <MainTabSwitcher {...props} {...item} />
    </CustomContainerModal>
  ));
};

const mapStateToProps = (state) => {
  return {
    dialogs: state.pages.filter((m) => m.type == "dialog"),
  };
};

export default injectIntl(connect(mapStateToProps, {})(MainTab));
