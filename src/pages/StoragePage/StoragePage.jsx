import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Avatar, Button, List, Skeleton, Tooltip, Typography } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { useGetFilesQuery } from '../../store/backendUserAPI';
import { skipToken } from '@reduxjs/toolkit/query';
import { UploadFile } from '../../components/UploadFile/UploadFile';

const { Title } = Typography;

export function StoragePage({ id }) {
    const { isAuth, username, token } = useAuth();
    const navigate = useNavigate();

    const { data, isLoading, isSuccess } = useGetFilesQuery({ token, id } || skipToken);

    useEffect(() => {
        if (!isAuth) {
            console.log(isAuth);
            navigate('/login');
        }
    }, [isAuth]);

    return (
        <>
            <List
                header={<Title level={2}>{`Hello, ${username}. Your storage:`}</Title>}
                className="demo-loadmore-list"
                loading={isLoading}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Tooltip title="efwefe">
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<StarFilled />}
                                    onClick={e => {
                                        console.log(e);
                                    }}
                                />
                            </Tooltip>,
                        ]}
                    >
                        <Skeleton avatar title={false} loading={isLoading} active>
                            <List.Item.Meta
                                title={<Link to={`/`}>{item.name}</Link>}
                                description={`uploaded_at: ${item.uploaded_at},   size: ${item.size},   comment: ${item.comment}`}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
            <UploadFile />
        </>
    );
}
