import React, { useEffect } from 'react';
import { useGetUsersQuery } from '../../store/backendUserAPI';
import { useAuth } from '../../hooks/useAuth';
import { StarFilled } from '@ant-design/icons';
import { Avatar, Button, List, Skeleton, Tooltip, Typography } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

const { Title } = Typography;

const usr = {
    id: 16,
    username: 'dqwdwdq',
    email: 'a89a1@yandex.ru',
    first_name: 'user16',
    is_staff: false,
    files_count: 0,
    files_size: null,
};

export function AdminUserPage() {
    const { isAuth, username, token, is_staff } = useAuth();
    const { data, isLoading, isSuccess } = useGetUsersQuery(token);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth || !is_staff) {
            navigate('/');
        }
    }, [isAuth]);

    return (
        <List
            header={<Title level={2}>{`Hello, ${username}. Registered users:`}</Title>}
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
                            title={
                                <Link
                                    to={`/storage/${item.id}`}
                                    state={{ username: item.username }}
                                >
                                    {item.username}
                                </Link>
                            }
                            description={`full name: ${item.first_name},   email: ${item.email},  is Admin: ${item.is_staff} totla files: ${item.files_count} total file size: ${item.files_size}`}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    );
}
