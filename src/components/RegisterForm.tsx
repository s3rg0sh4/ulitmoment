import React, { useEffect } from 'react';
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from '../api';
import { useForm } from 'react-hook-form';
import { Login, Register } from '../types/auth';

function RegisterForm() {
    useEffect(() => {
        localStorage.removeItem('auth');
    }, [])

    const [login, result] = api.useSetPasswordMutation();

    const { register, handleSubmit, watch } = useForm<Register>({ defaultValues: { email: '', password: '', confirmPassword: '' } })
    const navigate = useNavigate()
    const submitHandler = (data: Register) => {
        login({email: data.email, password: data.password})
    }

    useEffect(() => {
        if (result.isSuccess) {
            navigate("/courses")
        }
    }, [result.isSuccess])

    return (
        <Container className='d-grid'>
            <Form onSubmit={handleSubmit(submitHandler)} className='p-3 mt-5 col-md-4 offset-md-4 align-self-center loginForm d-grid'>
                <span className="p-1 mx-auto textHead">Вход</span>
                <Form.Group className="p-1 col-md-10 offset-md-1 align-self-center" controlId="formBasicEmail">
                    <Form.Label>Электронная почта</Form.Label>
                    <Form.Control {...register('email')} type="email" />
                </Form.Group>

                <Form.Group className="p-1 col-md-10 offset-md-1 align-self-center" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control {...register('password')} type="password" />
                </Form.Group>

                <Form.Group className="p-1 col-md-10 offset-md-1 align-self-center" controlId="formBasicPassword">
                    <Form.Label>Повторите пароль</Form.Label>
                    <Form.Control type="password"
                        {...register("confirmPassword", {
                            required: true,
                            validate: (val: string) => watch("password") === val || "Пароли не совпадают"
                        })} />
                </Form.Group>

                <Button className="px-3 mt-3 mx-auto " type="submit">
                    Войти
                </Button>
            </Form>
        </Container>
    );
};

export default RegisterForm;