import React from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import PasswordForm from "../PasswordForm";
import { useApolloClient } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";
import EmailForm from "../EmailForm";
import DescriptionForm from "../DescriptionForm";
import SiteWebForm from "../SiteWebForm";
import "./SettingsForm.scss";

export default function SettingsForm(props) {
  const {
    setShowModal,
    setTitleModal,
    setChildenModal,
    getUser,
    refetch,
  } = props;
  const history = useHistory();
  const client = useApolloClient();
  const { loguot } = useAuth();
  const onChangePassword = () => {
    setTitleModal("Cambiar tu contraseña");
    setChildenModal(<PasswordForm logout={onLogout} />);
  };

  const onChangeEmail = () => {
    setTitleModal("Cambiar Email");
    setChildenModal(
      <EmailForm
        setShowModal={setShowModal}
        currentEmail={getUser.email}
        refetch={refetch}
      />
    );
  };

  const onChangeDescription = () => {
    setTitleModal("Cambiar tu descripcion");
    setChildenModal(
      <DescriptionForm
        setShowModal={setShowModal}
        currentDescription={getUser.description}
        refetch={refetch}
      />
    );
  };

  const onChangeSiteWeb = () => {
    setTitleModal("Cambiar sitio web");
    setChildenModal(
      <SiteWebForm
        setShowModal={setShowModal}
        currentSiteWeb={getUser.siteWeb}
        refetch={refetch}
      />
    );
  };

  const onLogout = () => {
    client.clearStore();
    loguot();
    history.push("/");
  };
  return (
    <div className="settings-form">
      <Button onClick={onChangePassword}>Cambiar Contraseña</Button>
      <Button onClick={onChangeEmail}>Cambiar Email</Button>
      <Button onClick={onChangeDescription}>Descripcion</Button>
      <Button onClick={onChangeSiteWeb}>Sitio Web</Button>
      <Button onClick={onLogout}>Cerrar Sesion</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
}
