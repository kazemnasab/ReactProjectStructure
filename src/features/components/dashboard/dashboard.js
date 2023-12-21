import React from "react";
import { injectIntl } from "react-intl";
import Card from "features/components/dashboard/Card";
import { connect } from "react-redux";
import { modalClose, modalOpen } from "redux/actions";

const Index = ({ intl, urls, modalOpenAction, modalCloseAction }) => {
  const { messages } = intl;
  //console.log(urls);
  return (
    <>
      {urls.map((subs) => {
        return (
          <div className="row">
            <h4 className="breadcrumb-wrapper">{messages[subs.title]}</h4>
            {subs.subs.map((url, index) => {
              return (
                <Card
                  key={url.url}
                  type={url.type}
                  title={url.title}
                  icon={url.icon}
                  className={url.className}
                  url={url.url}
                  onClick={
                    url.modal
                      ? () => {
                        modalOpenAction({
                          ...url.modal,
                          onCallBack: (close, res) => {
                            if (close)
                              modalCloseAction({});
                          },
                        });
                        //setSaleServiceEditModal(true);
                      }
                      : null
                  }
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default injectIntl(
  connect(null, {
    modalCloseAction: modalClose,
    modalOpenAction: modalOpen,
  })(Index)
);
