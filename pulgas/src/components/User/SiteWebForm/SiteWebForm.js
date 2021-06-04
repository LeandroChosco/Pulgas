import React from "react";
import "./SiteWebForm.scss";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";

export default function SiteWebForm(props) {
  const { setShowModal, currentSiteWeb, refetch } = props;
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: {
      siteWeb: currentSiteWeb || "",
    },
    validationSchema: Yup.object({
      siteWeb: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await updateUser({
          variables: {
            input: formData,
          },
        });
        refetch();
        setShowModal(false);
      } catch (error) {
        toast.error("Error al actualizar sitio web");
      }
    },
  });
  return (
    <Form className="site-web" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="Nuevo sitio Web"
        name="siteWeb"
        value={formik.values.siteWeb}
        onChange={formik.handleChange}
        error={formik.errors.siteWeb && true}
      />
      <Button type="submit" className="btn-submit">
        Actulizar
      </Button>
    </Form>
  );
}
