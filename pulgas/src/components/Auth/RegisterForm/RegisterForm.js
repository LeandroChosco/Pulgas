import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import "./RegisterForm.scss";
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../../gql/user';

export default function RegisterForm(props) {
    const { setShowLogin } = props;
    const [register] = useMutation(REGISTER);
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            name: Yup.string().required(true),
            username: Yup.string().matches(/^[a-zA-Z0-9-]*$/, "El nombre del usuario no puede tener espacio"),
            email: Yup.string().email("El email no es valido"),
            password: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("repeatPassword")], "Las contraseñas no coinciden"),
            repeatPassword: Yup.string().required("La contraseña es obligatoria").oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
        }),
        onSubmit: async (formData) => {
            try {
                const newUser = formData;
                delete newUser.repeatPassword;
                await register({
                    variables: {
                        input: newUser,
                    },
                })
                toast.success("Usuario registrado correctamente");
                setShowLogin(true);
            } catch (error) {

                toast.error(error.message);
                console.log(error);
            }
        },
    });

    return (
        <>
            <h3 className="register-form-title">Registrate y disfruta de los mejores videos con tus amigos</h3>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input type="text" placeholder="Nombre y Apellidos" name="name" onChange={formik.handleChange} error={formik.errors.name && true} />
                <Form.Input type="text" placeholder="Nombre de usuario" name="username" onChange={formik.handleChange} error={formik.errors.username && true} />
                <Form.Input type="text" placeholder="Correo electronico" name="email" onChange={formik.handleChange} error={formik.errors.email && true} />
                <Form.Input type="password" placeholder="Password" name="password" onChange={formik.handleChange} error={formik.errors.password && true} />
                <Form.Input type="password" placeholder="Repetir password" name="repeatPassword" onChange={formik.handleChange} error={formik.errors.repeatPassword && true} />
                <Button type="submit" className="btn-submit">Registrarse</Button>

            </Form>
        </>
    )
}

function initialValues() {
    return {
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
}