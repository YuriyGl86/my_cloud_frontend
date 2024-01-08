import React from 'react';
import { Form, Button, Checkbox, DatePicker, Input, Select, Space, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useLoginMutation } from '../../store/backendUserAPI';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/slices/userSlice';

export function LoginPage() {
    const [login, { isLoading, isError, isSuccess, error, data }] = useLoginMutation();
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const key = 'updatable';

    const onFinish = async values => {
        console.log(values);
        try {
            messageApi.open({
                key,
                type: 'loading',
                content: 'Loading...',
            });
            const token = await login(JSON.stringify(values)).unwrap();
            dispatch(userActions.setToken({ token }));
            console.log('после запроса');
        } catch (e) {
            console.log(e);
            messageApi.open({
                key,
                type: 'error',
                content: `Ошибка отправки запроса: ${e.error}`,
                onClose: () => {
                    console.log('всеее');
                },
            });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            console.log(data);
            messageApi.open({
                key,
                type: 'success',
                content: 'Loaded!',
                duration: 2,
            });
        }
    }, [isSuccess]);

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
                    >
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        </div>
    );
}
