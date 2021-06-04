import React, { useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import ImageNoFound from "../../../assets/png/avatar.png";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import ModalBasic from "../../Modal/ModalBasic";
import AvatarForm from "../AvatarForm";
import SettingsForm from "../SettingsForm";
import HeaderProfile from "./HeaderProfile";
import Followers from "./Followers";
import useAuth from "../../../hooks/useAuth";
import UserNotFound from "../../UserNotFound";
import "./Profile.scss";

export default function Profile(props) {
  const { username } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildenModal] = useState(null);
  const { auth } = useAuth();
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: {
      username,
    },
  });
  if (loading) return null;
  if (error) return <UserNotFound />;
  const { getUser } = data;

  const handlerModal = (type) => {
    switch (type) {
      case "avatar":
        setTitleModal("Cambiar foto de perfil");
        setChildenModal(<AvatarForm setShowModal={setShowModal} auth={auth} />);
        setShowModal(true);
        break;
      case "settings":
        setTitleModal("");
        setChildenModal(
          <SettingsForm
            setShowModal={setShowModal}
            setTitleModal={setTitleModal}
            setChildenModal={setChildenModal}
            getUser={getUser}
            refetch={refetch}
          />
        );
        setShowModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Grid className="profile">
        <Grid.Column width={5} className="profile__left">
          <Image
            src={getUser.avatar ? getUser.avatar : ImageNoFound}
            avatar
            onClick={() => username === auth.username && handlerModal("avatar")}
          />
        </Grid.Column>
        <Grid.Column width={11} className="profile__right">
          <HeaderProfile
            getUser={getUser}
            auth={auth}
            handlerModal={handlerModal}
          />
          <Followers username={username} />
          <div className="other">
            <p className="name">{getUser.name}</p>
            {getUser.siteWeb && (
              <a
                href={getUser.siteWeb}
                className="siteweb"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                {getUser.siteWeb}{" "}
              </a>
            )}
            {getUser.description && (
              <p className="description"> {getUser.description} </p>
            )}
          </div>
        </Grid.Column>
      </Grid>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
}
