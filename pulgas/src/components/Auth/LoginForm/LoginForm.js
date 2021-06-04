import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../../gql/user';
import * as Yup from 'yup';
import { setToken, decodeToken } from '../../../utils/token';
import useAuth from '../../../hooks/useAuth';
import './LoginForm.scss';

export default function LoginForm() {
    const [error, setError] = useState("");
    const [login] = useMutation(LOGIN);
    const { setUser } = useAuth();


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria"),
        }),
        onSubmit: async (formData) => {
            setError("");
            try {
                const { data } = await login({
                    variables: {
                        input: formData,
                    }
                });
                const { token } = data.login;
                setToken(token);
                setUser(decodeToken(token));
            } catch (error) {
                setError(error.message);
            }
        }
    });

    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <h3>Ingresa a esta espectacular red social</h3>
            <Form.Input type="text" placeholder="Correo electronico" name="email" onChange={formik.handleChange} values={formik.values.email} error={formik.errors.email && true} />
            <Form.Input type="password" placeholder="Contraseña" name="password" onChange={formik.handleChange} values={formik.values.password} error={formik.errors.password && true} />
            <Button type="submit" className="btn-submit">Iniciar Sesión</Button>
            {error && <p className="submit-error">{error}</p>}
        </Form>
    )
}

function initialValues() {

    return {
        email: "",
        password: ""
    }
}