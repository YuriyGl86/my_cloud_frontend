import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Avatar, Button, List, Skeleton, Tooltip, Typography } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import {
    useDeleteFileMutation,
    useEditFileNameMutation,
    useGetFilesQuery,
} from '../../store/backendUserAPI';
import { skipToken } from '@reduxjs/toolkit/query';
import { UploadFile } from '../../components/UploadFile/UploadFile';

const { Title } = Typography;

export function StoragePage({ id }) {
    const { isAuth, username, token } = useAuth();
    const navigate = useNavigate();
    const locationState = useLocation().state;

    const { data, isLoading, isSuccess } = useGetFilesQuery({ token, id } || skipToken);
    const [deleteFile] = useDeleteFileMutation();
    const [rename] = useEditFileNameMutation();

    useEffect(() => {
        if (!isAuth) {
            console.log(isAuth);
            navigate('/login');
        }
    }, [isAuth]);

    const handleDeleteFile = async id => {
        deleteFile({ token, id }).unwrap();
    };

    const handleEditFileName = (newName, id) => {
        console.log(newName, id);
        try {
            rename({ token, id, body: { name: newName } }).unwrap();
        } catch (e) {
            console.log(e);
        }
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
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Tooltip title="Delete file">
                                <Button
                                    icon={<DeleteTwoTone />}
                                    onClick={() => handleDeleteFile(item.id)}
                                />
                            </Tooltip>,
                        ]}
                    >
                        <Skeleton avatar title={false} loading={isLoading} active>
                            <List.Item.Meta
                                title={
                                    <Link to={`/`}>
                                        <Title
                                            level={4}
                                            editable={{
                                                onChange: newName => {
                                                    handleEditFileName(newName, item.id);
                                                },
                                            }}
                                        >
                                            {item.name}
                                        </Title>
                                    </Link>
                                }
                                description={`uploaded_at: ${item.uploaded_at},   size: ${item.size},   comment: ${item.comment}`}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
            {locationState ? null : <UploadFile />}
        </>
    );
}
