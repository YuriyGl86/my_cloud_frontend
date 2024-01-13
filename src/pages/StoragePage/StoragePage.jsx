import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Space, Button, List, Tooltip, Typography } from 'antd';
import {
    DeleteTwoTone,
    FileOutlined,
    CloudDownloadOutlined,
    CloudUploadOutlined,
    DownloadOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import {
    useDeleteFileMutation,
    useEditFileMutation,
    useGetFilesQuery,
} from '../../store/backendUserAPI';
import { skipToken } from '@reduxjs/toolkit/query';
import { UploadFile } from '../../components/UploadFile';
import { IconText } from '../../components/IconText';

const { Title, Text } = Typography;

// const datamock = [
//     {
//         name: '1111',
//         id: '12',
//         size: '1234567',
//         comment: 'fqfqfqwfqwfqwfqwf',
//         uploaded_at: '12/12/12 12:12:12',
//     },
//     {
//         name: '1111',
//         id: '12',
//         size: '1234567',
//         comment: 'fqfqfqwfqwfqwfqwf',
//         uploaded_at: '12/12/12 12:12:12',
//     },
// ];

export function StoragePage({ id }) {
    const { isAuth, username, token } = useAuth();
    const navigate = useNavigate();
    const locationState = useLocation().state;

    const { data, isLoading } = useGetFilesQuery({ token, id } || skipToken);
    const [deleteFile] = useDeleteFileMutation();
    const [rename] = useEditFileMutation();

    useEffect(() => {
        if (!isAuth) {
            console.log(isAuth);
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [isAuth]);

    const handleDeleteFile = async id => {
        try {
            deleteFile({ token, id }).unwrap();
        } catch (e) {
            console.log(e);
        }
    };

    const handleEditFileName = (newName, id) => {
        console.log(newName, id);
        try {
            rename({ token, id, body: { name: newName } }).unwrap();
        } catch (e) {
            console.log(e);
        }
    };

    const handleEditComment = (newComment, id) => {
        console.log(newComment, id);
        try {
            rename({ token, id, body: { comment: newComment } }).unwrap();
        } catch (e) {
            console.log(e);
        }
    };

    const handleDownloadFile = id => {
        console.log('download  ', id);
    };

    const handleShareFile = id => {
        console.log('download  ', id);
    };

    return (
        <>
            <List
                header={
                    <Title level={2}>{`Hello, ${username}. ${
                        locationState ? locationState.username + '`s' : 'Your'
                    } storage:`}</Title>
                }
                className="demo-loadmore-list"
                loading={isLoading}
                bordered
                itemLayout="vertical"
                dataSource={data}
                size="small"
                renderItem={item => (
                    <List.Item
                        extra={[
                            <Space key="buttons">
                                <Tooltip title="Share file link" key="share">
                                    <Button
                                        icon={
                                            <ShareAltOutlined
                                                style={{ color: 'rgb(22, 119, 255)' }}
                                            />
                                        }
                                        onClick={() => handleShareFile(item.id)}
                                    />
                                </Tooltip>

                                <Tooltip title="Download file" key="download">
                                    <Button
                                        icon={
                                            <DownloadOutlined
                                                style={{ color: 'rgb(22, 119, 255)' }}
                                            />
                                        }
                                        onClick={() => handleDownloadFile(item.id)}
                                    />
                                </Tooltip>

                                <Tooltip title="Delete file" key="delete">
                                    <Button
                                        icon={<DeleteTwoTone />}
                                        onClick={() => handleDeleteFile(item.id)}
                                    />
                                </Tooltip>
                            </Space>,
                        ]}
                        actions={[
                            <IconText
                                icon={<CloudUploadOutlined />}
                                text={`uploaded at: ${item.uploaded_at}`}
                                key="upload"
                            />,
                            <IconText
                                icon={<FileOutlined />}
                                text={`size: ${item.size}`}
                                key="size"
                            />,
                            <IconText
                                icon={<CloudDownloadOutlined />}
                                text={`Last download: ${item.id}`}
                                key="download"
                            />,
                        ]}
                    >
                        <List.Item.Meta
                            title={
                                <Text
                                    editable={{
                                        onChange: newName => {
                                            handleEditFileName(newName, item.id);
                                        },
                                        triggerType: ['icon', 'text'],
                                    }}
                                >
                                    {item.name}
                                </Text>
                            }
                            description={
                                <Text
                                    editable={{
                                        onChange: newComment => {
                                            handleEditComment(newComment, item.id);
                                        },
                                        triggerType: ['icon', 'text'],
                                    }}
                                >
                                    {item.comment}
                                </Text>
                            }
                        />
                    </List.Item>
                )}
            />
            {locationState ? null : <UploadFile />}
        </>
    );
}
