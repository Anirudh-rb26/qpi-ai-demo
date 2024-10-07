"use client";

import ProgressBar from '@/components/progress-bar';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useEdgeStore } from '@/lib/edgestore'; // Import useEdgeStore here
import uploadService from '@/lib/upload-service';
import { useRouter } from 'next/navigation';

const UploadFilesPage = () => {
    const [files, setFiles] = useState<File[]>([]);
    const { edgestore } = useEdgeStore(); // Get edgestore from useEdgeStore
    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles(selectedFiles);
            // Reset progress for new selection
            const initialProgress: { [key: string]: number } = {};
            selectedFiles.forEach(file => {
                initialProgress[file.name] = 0;
            });
            setUploadProgress(initialProgress);
        }
    };

    const handleUpload = () => {
        uploadService.uploadFiles(edgestore, files); // Pass edgestore to the upload service
    };

    const router = useRouter();

    function navigateToPage(link: string) {
        router.push(link);
    }

    return (
        <main className='bg-black min-h-screen flex flex-col items-center justify-center'>
            <div className='flex flex-col gap-5'>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className='text-gray-700'
                    multiple // Allow multiple files
                />

                <Button onClick={handleUpload}>Upload</Button>

                <Button onClick={() => { navigateToPage('/') }}>Go Back</Button>

                <div>
                    {files.map(file => (
                        <div key={file.name}>
                            <span className='text-white'>{file.name}</span>
                            <ProgressBar progress={uploadProgress[file.name] || 0} />
                        </div>
                    ))}
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
                />
            </div>
        </main>
    );
}

export default UploadFilesPage;
