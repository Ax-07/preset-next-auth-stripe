"use client"
import { useIsMobile } from '@/hooks/use-mobile';
import React from 'react';
import { DesktopHeader } from './DesktopNavbar';
import { MobileHeader } from './MobileNavbar';
import { User } from 'better-auth';

export const Navigation = ({user}: {user: User}) => {
    const isMobile = useIsMobile()
    return (
        <>
            {isMobile ? <MobileHeader user={user} /> : <DesktopHeader user={user} />}
        </>
    );
};
