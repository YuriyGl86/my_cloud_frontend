import React, { useState } from 'react';
import { Form, Button, Upload, Input, Typography, message } from 'antd';
import { UploadOutlined, EditOutlined, CommentOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { useSendFileMutation } from '../../store/backendUserAPI';
const { Title } = Typography;

export function UploadFile() {
    const { token } = useAuth();

    const [sendFile] = useSendFileMutation();

    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [formKey, setFormKey] = useState(1); // чтобы форма сбрасывалась при смене ключа после submit

    const onFinish = async ({ comment, rename }) => {
        console.log(rename, comment);
        const formData = new FormData();
        const data = {
            file: fileList[0],
            ...(comment && { comment }),
            ...(rename && { rename }),
        };
        console.log(data);
        for (const name in data) {
            formData.append(name, data[name]);
        }
        setUploading(true);
        try {
            await sendFile({ token, body: formData }).unwrap();
            setFileList([]);
            message.success('upload successfully.');
            setFormKey(prev => prev + 1);
        } catch (e) {
            console.log(e);
            message.error('upload failed.');
        } finally {
            setUploading(false);
        }
    };
    const props = {
        onRemove: () => {
            setFileList([]);
        },
        beforeUpload: file => {
            setFileList([file]);
            return false;
        },
        fileList,
        maxCount: 1,
    };

    // const onFinish = async ({ comment, upload, rename }) => {
    //     const data = { comment, file: upload[0].originFileObj, rename };
    //     const formData = new FormData();
    //     for (const name in data) {
    //         formData.append(name, data[name]);
    //     }
    //     try {
    //         await sendFile({ token, body: formData }).unwrap();
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

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
                key={formKey}
            >
                <Form.Item
                    name="rename"
                    rules={[
                        {
                            validator: (_, value) =>
                                // eslint-disable-next-line
                                (value && !!value.match(/^[^\\/:\*\?\"<>\|]+$/)) | !value
                                    ? Promise.resolve()
                                    : Promise.reject(
                                          'нельзя использовать символы  / : * ? " < > |',
                                      ),
                        },
                    ]}
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
                    rules={[
                        {
                            required: true,
                            message: 'Нельзя загрузить файл, не выбрав его',
                        },
                    ]}
                >
                    <Upload name="file" {...props}>
                        <Button icon={<UploadOutlined />}>Choose file</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button
                        disabled={fileList.length === 0}
                        block
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={uploading}
                    >
                        Upload
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
