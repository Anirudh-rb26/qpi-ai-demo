import React from 'react'
import { checkRole } from '@/utils/roles'
import { redirect } from 'next/navigation'
import { clerkClient } from '@clerk/nextjs/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { RoleSelectorDropdown } from '@/components/role-selector-client'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const ManageRolesPage = async () => {

    if (!checkRole('admin')) {
        redirect('/fallback/no-access')
    }

    // Gets a list of all Users
    const allUsers = (await clerkClient().users.getUserList()).data;

    return (
        <main className='min-h-screen bg-black text-white flex flex-col items-center'>

            <p className='mb-5'>This is the protected admin dashboard restricted to users with the `admin` role.</p>

            <div className='space-y-4'>
                {allUsers.map((user) => {
                    // prop to pass
                    const plainUser = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress,
                        imageUrl: user.imageUrl,
                        publicMetadata: user.publicMetadata,
                    };

                    return (
                        <div key={user.id} className='flex items-center space-x-4 p-4 bg-gray-950 rounded-md'>

                            {/* UserImage */}
                            <Avatar className='h-10 w-10'>
                                <AvatarImage src={user.imageUrl} />
                                <AvatarFallback></AvatarFallback>
                            </Avatar>

                            <div className='flex-1'>
                                {/* Username */}
                                <div>
                                    {user.firstName} {user.lastName}
                                </div>

                                {/* Email Address */}
                                <div>
                                    {user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress}
                                </div>

                            </div>

                            {/* Dropdown */}
                            <div>
                                <RoleSelectorDropdown user={plainUser} />
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Change Alerts */}
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </main>
    );
}

export default ManageRolesPage;
