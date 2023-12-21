import React from "react";
import Login from "./components/Login"
import { injectIntl } from "react-intl";

const Index = ({ intl }) => {
  const { messages } = intl;
  React.useEffect(() => {
    document.title = messages["app.name"];
    //document.getElementsByTagName('body').style('background-color: #dfdfdf');
  }, []);

  return (
    <div className="authentication-wrapper authentication-cover">
      <div className="authentication-inner row m-0">
        <div className="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center">
          <div className="flex-row text-center mx-auto">
          <h3>همت کنیم هیچ سفره ای بی نان نماند</h3>
            <img
              src="../../assets/img/pages/logo.gif"
              alt="Auth Cover Bg color"
              width="520"
              className="img-fluid authentication-cover-img"
              data-app-light-img="pages/login.png"
              data-app-dark-img="pages/login.png"
            />
            <div className="mx-auto">
              <p>
                <br />
              </p>
            </div>
          </div>
        </div>
        <Login />
      </div>
    </div>
  );
}
export default injectIntl(Index);
