import React from 'react';
import { PageHeader } from '@ant-design/pro-layout';
import { Link } from 'react-router-dom';

import { NavButtons } from '../NavButtons/NavButtons';

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
