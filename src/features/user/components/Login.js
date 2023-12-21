import React from "react";
import { injectIntl } from "react-intl";
import { currentUser } from "constants/defaultValues";
import { setCurrentUser } from "helpers/Utils";
import { UserApi } from "features/repositories";
import { Api } from "@mui/icons-material";

const Index = ({ intl }) => {
  const { messages } = intl;
  const [message, setMessage] = React.useState(null);
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const clickLogin = () => {
    var api = UserApi.Login({ user: user, password: password }).apply();
    api.then((res) => {
      console.log(res.data);
      if (res.data.message) alert(res.data.message);
      else {
        const currentUser = { ...res.data.user, token: res.data.token };
        setCurrentUser({ ...currentUser, roleTitle: "کاربر سیستم" }).then(
          () => {
            setCurrentUser({
              ...res.data.user,
              token: res.data.token,
              app: res.data.app,
              roleTitle: "کاربر سیستم",
            }).then(() => {
              window.location.href = `/app/${res.data.app}`;
            });
          }
        );
      }
    });
    //setCurrentUser(currentUser).then(() => {
    //  window.location.href="/app"
    //});
  };

  return (
    <div className="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-5 p-4">
      <div className="w-px-400 mx-auto">
        <div className="app-brand mb-4">
          <div className="app-brand-link gap-2 mb-2">
            <span className="app-brand-logo demo"></span>
            <span className="app-brand-text demo h3 mb-0 fw-bold">
              {messages["app.name"]}
            </span>
          </div>
        </div>
        {
          //<p className="mb-4">{messages["user.login.title"]}</p>
        }

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            {messages["user.login.name_or_mobile"]}
          </label>
          <input
            type="text"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
            className="form-control text-start"
            dir="ltr"
            id="email"
            name="email-username"
            placeholder={messages["user.login.placeholder"]}
            autoFocus
          />
        </div>
        <div className="mb-3 form-password-toggle">
          <div className="d-flex justify-content-between">
            <label className="form-label" htmlFor="password">
              {messages["user.login.password"]}
            </label>
            <a href="#">
              <small>{messages["user.login.forgot-password"]}</small>
            </a>
          </div>
          <div className="input-group input-group-merge">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
              className="form-control text-start"
              dir="ltr"
              name="password"
              placeholder="············"
              aria-describedby="password"
            />
            <span className="input-group-text cursor-pointer">
              <i className="bx bx-hide"></i>
            </span>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="remember-me"
            />
            <label className="form-check-label" htmlFor="remember-me">
              {" "}
              {messages["user.login.remember-password"]}{" "}
            </label>
          </div>
        </div>
        <button onClick={clickLogin} className="btn btn-primary d-grid w-100">
          {messages["user.login.button"]}
        </button>
      </div>
    </div>
  );
};

export default injectIntl(Index);
