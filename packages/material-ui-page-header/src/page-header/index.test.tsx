import React from "react";
import {IntlProvider} from "react-intl";
import {render, cleanup} from "@testing-library/react";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";

import {PageHeader} from "./";

afterEach(cleanup);

const i18n = {
  "pages.test.title": "Title",
};

describe("<PageHeader />", () => {
  it("renders component", () => {
    const {asFragment} = render(
      <MuiThemeProvider theme={createMuiTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <PageHeader message="pages.test.title" />
        </IntlProvider>
      </MuiThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
