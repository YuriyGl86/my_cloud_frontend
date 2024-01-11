import React from 'react';
import { Form, Button, Upload, DatePicker, Input, Select, Space, message } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { useSendFileMutation } from '../../store/backendUserAPI';

export function UploadFile() {
    const { isAuth, username, token, is_staff } = useAuth();

    const [sendFile, { isLoading, isError, isSuccess, error }] = useSendFileMutation();

    const onFinish = values => {
        console.log(values);
        const { comment, upload } = values;
        const data = { comment, file: upload[0].originFileObj };
        console.log(data);
        const formData = new FormData();

        for (const name in data) {
            formData.append(name, data[name]);
        }
        try {
            sendFile({ token, body: formData });
        } catch (e) {
            console.log(e);
        }
    };

    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div className="upload-form">
            {/* {contextHolder} */}
            <Form
                name="upload_file"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="comment"
                    rules={[{ required: false, message: 'Please input comment here' }]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="comment"
                        autoComplete="off"
                    />
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="File to Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        name="file"
                        listType="picture"
                        customRequest={info => {
                            console.log(info);
                        }}
                        showUploadList={{ downloadIcon: false }}
                    >
                        <Button icon={<UploadOutlined />}>Click to add</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={false}
                    >
                        Upload
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
