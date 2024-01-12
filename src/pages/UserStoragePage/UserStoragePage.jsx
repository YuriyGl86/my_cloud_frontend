import React from 'react';
import { useParams } from 'react-router-dom';
import { StoragePage } from '../StoragePage';

export function UserStoragePage() {
    const { id } = useParams();

    return <StoragePage id={id} />;
}
