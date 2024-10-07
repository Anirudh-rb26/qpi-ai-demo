"use client"

import ProgressBar from '@/components/progress-bar';
import { Button } from '@/components/ui/button';
import { useEdgeStore } from '@/lib/edgestore';
import React, { useState } from 'react'
import { Bounce, Flip, toast, ToastContainer } from 'react-toastify';

const UploadFilesPage = () => {
    const [file, setFile] = useState<File>();
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const { edgestore } = useEdgeStore();

    return (
        <main className='bg-black min-h-screen flex flex-col items-center justify-center'>
            <div className='flex flex-col gap-5'>
                <input
                    type="file"
                    onChange={(e) => {
                        setFile(e.target.files?.[0]);
                    }} className='text-gray-700' />

                <Button onClick={async () => {
                    if (file) {
                        const res = await edgestore.publicFiles.upload({
                            file, onProgressChange: (progress) => {
                                setUploadProgress(progress);
                                if (progress === 100) {
                                    // Success Toast
                                    toast.success('File Uploaded', {
                                        position: "bottom-center",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "dark",
                                        transition: Bounce,
                                    });

                                    // Timeout to reset Progressbar
                                    setTimeout(() => {
                                        setUploadProgress(0);
                                    }, 3000);
                                }
                                console.log(progress);
                            }
                        });
                        console.log(res);
                    }
                }}>Upload</Button>


                <div>
                    <ProgressBar progress={uploadProgress} />
                </div>

                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Flip}
                />
            </div>
        </main >
    )
}

export default UploadFilesPage