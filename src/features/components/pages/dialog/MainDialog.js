import * as React from "react";
import { injectIntl } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";

import CustomContainerModal from "features/components/common/CustomContainerModal";
import MainDialogSwitcher from "./MainDialogSwitcher";
import { DialogContext } from "providers/context/contexts";

const MainDialog = (props) => {
  const { dialogs } =
    React.useContext(DialogContext);

  return dialogs.map((item) => {
    return <CustomContainerModal
      key={item.page}
      isOpen={true}
      title={item.title}
      {...item}
      {...props}
      toggle={() => {
        if (item.onCallBack) item.onCallBack(true, null);
        if (item.child && item.child.props.onCallBack)
          item.child.props.onCallBack(true, null);
      }}
    >
      {item.child ? (
        {
          ...item.child,
            props: {
            ...item.child.props,
            ...item.props,
            onCallBack: item.child.props.onCallBack ?? item.onCallBack,
          },
        }
      ) : (
        <MainDialogSwitcher {...props} {...item} />
      )}
    </CustomContainerModal>
});
};

const mapStateToProps = (state) => {
  return {
    dialogs: state.pages.filter((m) => m.type == "dialog"),
  };
};

export default injectIntl(connect(mapStateToProps, {})(MainDialog));
