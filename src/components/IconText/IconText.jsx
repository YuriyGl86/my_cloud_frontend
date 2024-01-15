import { Space } from 'antd';
import React from 'react';

export const IconText = ({ icon, text, children }) => (
    <Space>
        {icon}
        {text}
        {children}
    </Space>
);
