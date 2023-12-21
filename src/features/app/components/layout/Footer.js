import React from "react";
import { injectIntl } from "react-intl";

const Index = ({ intl }) => {
  const { messages } = intl;
  return (
    <footer className="content-footer footer bg-footer-theme">
      <div className="container-fluid d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
        <div className="mb-2 mb-md-0">
          <a
            href="https://vefaghsabz.ir/"
            target="_blank"
            className="footer-link fw-semibold"
          >
            {messages["general.copyright"]}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default injectIntl(Index);
