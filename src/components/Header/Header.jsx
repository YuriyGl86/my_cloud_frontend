import React from 'react';
import { PageHeader } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export function Header() {
    return (
        <PageHeader
            ghost={false}
            title="MyCloud"
            subTitle="Облачное хранилище"
            extra={[
                <Link to="/register" rel="noopener noreferrer">
                    <Button key="1">Register</Button>
                </Link>,
                <Link to="/login" rel="noopener noreferrer">
                    <Button key="2" type="primary">
                        LogIn
                    </Button>
                </Link>,
            ]}
        />
    );
}
