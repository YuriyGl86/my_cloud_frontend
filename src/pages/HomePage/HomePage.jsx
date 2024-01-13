import React from 'react';
import { Typography } from 'antd';

import { NavButtons } from '../../components/NavButtons/NavButtons';

const { Title, Paragraph, Text } = Typography;

export function HomePage() {
    return (
        <>
            <div className="content-container">
                <Title level={2}>Welcome to MyCloud Storage!</Title>
                <Paragraph>
                    This is a cloud storage where you can store your files of any type.
                    Only authorized users can use the service. Click the{' '}
                    <Text keyboard>login</Text> button and log in to the app. If you
                    haven't registered yet, click the registration button.
                </Paragraph>
                <div>
                    <NavButtons />
                </div>
            </div>
        </>
    );
}
