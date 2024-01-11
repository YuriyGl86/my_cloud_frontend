import React from 'react';
import { Form, Button, Checkbox, DatePicker, Input, Select, Space, message } from 'antd';
import { useRegisterMutation } from '../../store/backendUserAPI';
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
    const [register, { isLoading, isError, isSuccess, error }] = useRegisterMutation();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';

    const handleSubmit = async values => {
        console.log(values);

        try {
            await register(JSON.stringify(values)).unwrap();
            messageApi.open({
                key,
                type: 'success',
                content: `Successfully registered!`,
                duration: 2,
                onClose: () => {
                    navigate('/login', { replace: true });
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="register-form-container">
            {contextHolder}
            <Form
                autoComplete="off"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                onFinish={handleSubmit}
                onFinishFailed={error => {
                    console.log({ error });
                }}
            >
                <Form.Item
                    name="username"
                    label="Login"
                    rules={[
                        {
                            required: true,
                            message: 'Введите логин',
                        },
                        { whitespace: true },
                        { min: 4, message: 'Минимум 4 символа' },
                        { max: 20, message: 'Максимум 20 символов' },
                        {
                            validator: (_, value) =>
                                value && value.match(/^[a-z]+[a-z0-9]*/i)
                                    ? Promise.resolve()
                                    : Promise.reject(
                                          'Только латинские буквы и цифры, первая буква',
                                      ),
                        },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Введите логин" />
                </Form.Item>

                <Form.Item
                    name="first_name"
                    label="Full Name"
                    rules={[
                        {
                            required: true,
                            message: 'Введите имя',
                        },
                        { whitespace: true },
                        { min: 2, message: 'Минимум 2 символа' },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Введите ваше имя" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Укажите вашу электропочту',
                        },
                        { type: 'email', message: 'Некорректный формат' },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Type your email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                        },
                        { min: 6, message: 'Минимум 6 символа' },
                        {
                            validator: (_, value) =>
                                value &&
                                value.match(/[A-Z]+/) &&
                                value.match(/\d+/i) &&
                                value.match(/[^a-z0-9]+/i)
                                    ? Promise.resolve()
                                    : Promise.reject('Пароль не подходит по условиям.'),
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Придумайте пароль" autoComplete="off" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Пароли не совпадают.');
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Подтвердите пароль" autoComplete="off" />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button block type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
