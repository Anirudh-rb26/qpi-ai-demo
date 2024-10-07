"use client"

import React from 'react'
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useUser } from '@clerk/nextjs';
import { Flip, toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface ButtonConfig {
    name: string;
    action: () => void;
    allowedRoles: string[];
}

const HomeClient = () => {

    const router = useRouter();

    const { user } = useUser();
    const currentRole = user?.publicMetadata.role as string;

    function navigateToPage(link: string) {
        router.push(link);
    }

    const showToast = (text: string) => {
        toast(text, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Flip,
        })
    }

    const buttons: ButtonConfig[] = [
        {
            name: "Button 1",
            action: () => { showToast("Button 1 Pressed") },
            allowedRoles: ['admin', 'role_a']
        },
        {
            name: "Button 2",
            action: () => { showToast("Button 2 Pressed") },
            allowedRoles: ['admin', 'role_b']
        },
        {
            name: "Button 3",
            action: () => { showToast("Button 3 Pressed") },
            allowedRoles: ['admin', 'role_b']
        },
        {
            name: "Button 4",
            action: () => { showToast("Button 4 Pressed") },
            allowedRoles: ['admin', 'role_c']
        },
        {
            name: "Button 5",
            action: () => { showToast("Button 5 Pressed") },
            allowedRoles: ['admin', 'role_c']
        },
        {
            name: "Button 6",
            action: () => { showToast("Button 6 Pressed") },
            allowedRoles: ['admin', 'moderator']
        },
        {
            name: "Button 7",
            action: () => { showToast("Button 7 Pressed") },
            allowedRoles: ['admin', 'moderator']
        },
        {
            name: "Button 8",
            action: () => { showToast("Button 8 Pressed") },
            allowedRoles: ['admin', 'moderator']
        }
    ];

    const renderButton = (button: ButtonConfig) => {
        const isEnabled = button.allowedRoles.includes(currentRole);
        return (
            <Button
                key={button.name}
                onClick={button.action}
                disabled={!isEnabled}
            >
                {button.name}
            </Button>
        );
    }

    return (
        <main className="items-center justify-center flex flex-col bg-black min-h-screen gap-8">
            <div className="text-xl text-white justify-center">
                <p>Your role is: {currentRole}</p>
            </div>

            <div className='flex gap-4 items-center'>
                <div className="flex flex-col gap-3">
                    {renderButton(buttons[0])}
                    <Separator />
                    {renderButton(buttons[1])}
                    {renderButton(buttons[2])}
                </div>

                <div className="flex flex-col gap-3">
                    {renderButton(buttons[3])}
                    {renderButton(buttons[4])}
                    <Separator />
                    {renderButton(buttons[5])}
                    {renderButton(buttons[6])}
                    {renderButton(buttons[7])}
                </div>

                {currentRole === 'admin' && (

                    <div className='flex flex-col gap-4'>
                        <Button onClick={() => navigateToPage('/upload-files')}>Upload Files</Button>
                        <Button onClick={() => navigateToPage('/modify-access')}>Modify Access</Button>
                    </div>
                )}
            </div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Flip} />
        </main>
    );
}

export default HomeClient