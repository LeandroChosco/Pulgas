import React from "react";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import * as Yup from "yup";
import "./EmailForm.scss";

export default function EmailForm(props) {
  const { setShowModal, currentEmail, refetch } = props;
  const [updateUser] = useMutation(UPDATE_USER);
  const formik = useFormik({
    initialValues: {
      email: currentEmail || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
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
        toast.error("No se pudo actualizar el email");
      }
    },
  });
  return (
    <div>
      <Form className="email-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          placeholder="Escribe tu nuevo email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email && true}
        />
        <Button type="submit" className="btn-submit">
          Actualizar
        </Button>
      </Form>
    </div>
  );
}
