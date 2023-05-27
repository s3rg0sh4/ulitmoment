import React, { useEffect } from 'react';
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from '../api';
import { useForm } from 'react-hook-form';
import { Login } from '../types/auth';

function LoginForm() {
    useEffect(() => {
        localStorage.removeItem('auth');
    }, [])

    const [login, result] = api.useLoginMutation();

    const { register, handleSubmit } = useForm<Login>({ defaultValues: { email: '', password: '' } })
    const navigate = useNavigate()
    const submitHandler = (data: Login) => {
        login(data)
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
                    <Form.Label>Email address</Form.Label>
                    <Form.Control {...register('email')} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="p-1 col-md-10 offset-md-1 align-self-center" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...register('password')} type="password" placeholder="Password" />
                </Form.Group>
                <Button className="button-flat px-3 mt-3 mx-auto " type="submit">
                    Войти
                </Button>
            </Form>
        </Container>

    );
}

export default LoginForm;