import React from 'react';
import { Form, Button, Checkbox, DatePicker, Input, Select, Space, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useLoginMutation } from '../../store/backendUserAPI';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';

export function LoginPage() {
    const [login, { isLoading, isError, isSuccess, error, data }] = useLoginMutation();
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const key = 'updatable';

    const onFinish = async values => {
        try {
            const token = await login(JSON.stringify(values)).unwrap();
            dispatch(userActions.setToken({ token: token.auth_token }));
            console.log(token);
            messageApi.open({
                key,
                type: 'success',
                content: `Successfully authenticated!`,
                duration: 2,
                onClose: () => {
                    navigate('/storage', { replace: true });
                },
            });
        } catch (e) {
            const content =
                e.status === 400
                    ? 'Неверный пароль'
                    : `Ошибка аутентификации: ${e.error}`;

            messageApi.open({
                key,
                type: 'error',
                content,
            });
        }
    };

    return (
        <div className="register-form-container login-form">
            {contextHolder}
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={isLoading}
                    >
                        Log in
                    </Button>
                    Or <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>
        </div>
    );
}
