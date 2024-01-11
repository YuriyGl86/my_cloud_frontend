import React from 'react';
import { PageHeader } from '@ant-design/pro-layout';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/slices/userSlice';
import { useLogoutMutation } from '../../store/backendUserAPI';
import { NavButtons } from '../NavButtons/NavButtons';

const { Title, Paragraph } = Typography;

export function Header() {
    return (
        <PageHeader
            ghost={false}
            title={
                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    MyCloud
                </Link>
            }
            subTitle="Облачное хранилище"
            extra={[<NavButtons key="1" />]}
        />
    );
}
