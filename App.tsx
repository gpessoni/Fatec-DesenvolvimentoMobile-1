import React from "react";
import Routes from './src/routes';
import Toast from "react-native-toast-message";

export default function App(): React.JSX.Element {
  return (
    <>
      <Routes />
      <Toast />
    </>
  );
}