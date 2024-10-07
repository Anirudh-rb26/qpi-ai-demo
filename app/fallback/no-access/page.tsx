import { Separator } from '@/components/ui/separator'
import React from 'react'

const NoAccess = () => {
    return (
        <main className='bg-black text-white min-h-screen flex flex-col justify-center' >
            <div className='flex justify-center gap-4'>
                <div className='flex items-center justify-center'>
                    <p>Error: No Access</p>
                </div>

                <div className='h-[50px]'>
                    <Separator orientation='vertical' />
                </div>

                <div className='flex flex-col '>
                    <p>You do not have access to the page.</p>
                    <p className='text-gray-400 text-sm'>Contact rolethathasaccess if you need access</p>
                </div>
            </div>
        </main>
    )
}

export default NoAccess