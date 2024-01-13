import React from 'react';
import { Form, Button, Upload, Input, Typography } from 'antd';
import { UploadOutlined, EditOutlined, CommentOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { useSendFileMutation } from '../../store/backendUserAPI';
const { Title } = Typography;

export function UploadFile() {
    const { token } = useAuth();

    const [sendFile] = useSendFileMutation();

    const onFinish = ({ comment, upload, rename }) => {
        const data = { comment, file: upload[0].originFileObj, rename };
        const formData = new FormData();
        for (const name in data) {
            formData.append(name, data[name]);
        }
        try {
            sendFile({ token, body: formData }).unwrap();
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
            <Title level={4}> Upload new file:</Title>
            {/* {contextHolder} */}
            <Form
                name="upload_file"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="rename"
                    rules={[{ required: false, message: 'Please input comment here' }]}
                    label="File name"
                >
                    <Input
                        prefix={<EditOutlined className="site-form-item-icon" />}
                        placeholder="if you want to rename"
                        autoComplete="off"
                    />
                </Form.Item>

                <Form.Item
                    label="Comment"
                    name="comment"
                    rules={[{ required: false, message: 'Please input comment here' }]}
                >
                    <Input
                        prefix={<CommentOutlined className="site-form-item-icon" />}
                        placeholder="type comment here"
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
                        <Button icon={<UploadOutlined />}>Choose file</Button>
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
