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
import moment from 'moment';

const { Title, Text } = Typography;

// const datamock = [
//     {
//         name: '1111',
//         id: '12',
//         size: '1234567',
//         comment: 'fqfqfqwfqwfqwfqwf',
//         uploaded_at: '2015-02-11T00:00:00.000Z',
//         file: 'https://ya.ru/',
//         last_download: '2015-02-11T00:00:00.000Z',
//     },
//     {
//         name: '1111',
//         id: '12',
//         size: '1234567',
//         comment: 'fqfqfqwfqwfqwfqwf',
//         uploaded_at: '2015-02-11T00:00:00.000Z',
//         file: 'https://ya.ru/',
//         last_download: '2015-02-11T00:00:00.000Z',
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
            await deleteFile({ token, id }).unwrap();
        } catch (e) {
            console.log(e);
        }
    };

    const handleEditFileName = async (newName, id) => {
        try {
            await rename({ token, id, body: { name: newName } }).unwrap();
        } catch (e) {
            console.log(e);
        }
    };

    const handleEditComment = async (newComment, id) => {
        try {
            await rename({ token, id, body: { comment: newComment } }).unwrap();
        } catch (e) {
            console.log(e);
        }
    };

    const handleDownloadFile = (id, name) => {
        // let filename = '';
        fetch(process.env.REACT_APP_BACKEND + `/api/v1/files/${id}/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then(response => {
                console.log(response.headers);
                // filename = response.headers
                //     .get('Content-Disposition')
                //     .split(';')[1]
                //     .split('=')[1];
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', name);

                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(console.log);
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
                                <Text
                                    copyable={{
                                        tooltips: ['copy file link', 'copied'],
                                        text: `${item.file_download_url}`,
                                        icon: [
                                            <Button
                                                icon={
                                                    <ShareAltOutlined
                                                        style={{
                                                            color: 'rgb(22, 119, 255)',
                                                        }}
                                                    />
                                                }
                                            />,
                                        ],
                                    }}
                                ></Text>

                                <Tooltip title="Download file" key="download">
                                    <Button
                                        icon={
                                            <DownloadOutlined
                                                style={{ color: 'rgb(22, 119, 255)' }}
                                            />
                                        }
                                        onClick={() =>
                                            handleDownloadFile(item.id, item.name)
                                        }
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
                                text={`uploaded at: ${moment(item.uploaded_at).format(
                                    'DD/MM/YYYY  hh:mm:ss',
                                )}`}
                                key="upload"
                            />,
                            <IconText
                                icon={<FileOutlined />}
                                text={`size: ${item.size}`}
                                key="size"
                            />,
                            <IconText
                                icon={<CloudDownloadOutlined />}
                                text={
                                    item.last_download
                                        ? `Last download: ${moment(
                                              item.last_download,
                                          ).format('DD/MM/YYYY  hh:mm:ss')}`
                                        : 'No downloads'
                                }
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
