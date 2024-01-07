import React from 'react';
import { Form, Button, Checkbox, DatePicker, Input, Select, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useLoginMutation } from '../../store/backendUserAPI';
import { useEffect } from 'react';

export function LoginPage() {
    const [login, { isLoading, isError, isSuccess, error, data }] = useLoginMutation();

    const onFinish = async values => {
        console.log(values);

        try {
            await login(JSON.stringify(values)).unwrap();
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            console.log(data);
        }
    }, [isSuccess]);

    return (
        <div className="register-form-container login-form">
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
