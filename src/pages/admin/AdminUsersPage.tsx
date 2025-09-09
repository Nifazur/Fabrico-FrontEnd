// src/pages/admin/AdminUsersPage.tsx
import React, { useState, useMemo } from 'react';
import { useGetAllUsersQuery } from '../../redux/features/userApi';
import { UsersTable } from '../../components/admin/users/UsersTable';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Skeleton } from '../../components/ui/skeleton';
import type { IUser } from '../../types';

const ITEMS_PER_PAGE = 10;

export const AdminUsersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, error } = useGetAllUsersQuery({});



    const users: IUser[] = useMemo(() => {
        return data?.data ?? []; // always return array
    }, [data]);

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            (user.email ?? '').toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredUsers, currentPage]);

    if (error) return <div>Failed to load users.</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Users</h1>
            <Input
                placeholder="Filter by email..."
                value={searchTerm}
                onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
                className="max-w-sm"
            />
            {isLoading ? <Skeleton className="h-96 w-full" /> : <UsersTable users={paginatedUsers} />}
            {totalPages > 1 && (
                <div className="flex items-center justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>Previous</Button>
                    <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>Next</Button>
                </div>
            )}
        </div>
    );
};