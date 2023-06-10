import React, { startTransition } from 'react';
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./lib/UserContext";
import { I18nextProvider } from 'react-i18next';
import i18n from './il8n';

startTransition(() => {
ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
});