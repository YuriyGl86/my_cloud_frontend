import React from 'react';
import { Typography } from 'antd';

import { NavButtons } from '../../components/NavButtons';

const { Title } = Typography;

export function NotFoundPage() {
    return (
        <>
            <div className="content-container">
                <Title level={2}>404 Page Not Found</Title>
                <div>
                    <NavButtons />
                </div>
            </div>
        </>
    );
}
