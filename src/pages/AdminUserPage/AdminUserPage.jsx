import React, { useEffect } from 'react';
import { useGetUsersQuery } from '../../store/backendUserAPI';
import { useAuth } from '../../hooks/useAuth';

import { useNavigate, Link } from 'react-router-dom';
import { Space, Button, List, Tooltip, Typography } from 'antd';
import {
    MailOutlined,
    DeleteTwoTone,
    FileOutlined,
    UserOutlined,
    CloudUploadOutlined,
} from '@ant-design/icons';
import { IconText } from '../../components/IconText';

const { Title } = Typography;

// const usr = [
//     {
//         id: 16,
//         username: 'dqwdwdq',
//         email: 'a89a1@yandex.ru',
//         first_name: 'user16',
//         is_staff: false,
//         files_count: 0,
//         files_size: null,
//     },
//     {
//         id: 16,
//         username: 'dqwdwdq',
//         email: 'a89a1@yandex.ru',
//         first_name: 'user16',
//         is_staff: false,
//         files_count: 0,
//         files_size: null,
//     },
// ];

export function AdminUserPage() {
    const { isAuth, username, token, is_staff } = useAuth();
    const { data, isLoading } = useGetUsersQuery(token);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth || !is_staff) {
            navigate('/');
        }
        // eslint-disable-next-line
    }, [isAuth, is_staff]);

    const handleDeleteUser = async id => {
        try {
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <List
            header={<Title level={2}>{`Hello, ${username}. Registered users:`}</Title>}
            className="demo-loadmore-list"
            loading={isLoading}
            itemLayout="vertical"
            dataSource={data}
            renderItem={item => (
                <List.Item
                    extra={[
                        <Space key="buttons">
                            <Tooltip title="Delete file" key="delete">
                                <Button
                                    icon={<DeleteTwoTone />}
                                    onClick={() => handleDeleteUser(item.id)}
                                />
                            </Tooltip>
                        </Space>,
                    ]}
                    actions={[
                        <IconText
                            icon={<MailOutlined />}
                            text={`Email: ${item.email}`}
                            key="upload"
                        />,
                        <IconText
                            icon={<FileOutlined />}
                            text={`Total file size: ${item.files_size}`}
                            key="size"
                        />,
                        <IconText
                            icon={<CloudUploadOutlined />}
                            text={`Total files uploaded: ${item.files_count}`}
                            key="download"
                        />,
                        <IconText
                            icon={<UserOutlined />}
                            text={`Is Admin: ${item.is_staff}`}
                            key="download"
                        />,
                    ]}
                >
                    <List.Item.Meta
                        title={
                            <Link
                                to={`/storage/${item.id}`}
                                state={{ username: item.username }}
                            >
                                {item.username}
                            </Link>
                        }
                        description={`full name: ${item.first_name}`}
                    />
                </List.Item>
            )}
        />
    );
}
