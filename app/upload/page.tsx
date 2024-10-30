'use client';
import React, { useState } from 'react'
import { CldUploadWidget, CldImage } from 'next-cloudinary';


interface CloudinaryResult {
    public_id: string;
}

const UploadPage = () => {
    const [publicId, setPublicId] = useState('');

    return (
        <>
            {publicId && <CldImage src={publicId} width={270} height={180} alt="An image"/>}
            <CldUploadWidget
                uploadPreset='testing'
                options={{
                    sources: ['local', 'url', 'google_drive']
                }}
                onSuccess={(result, widget) => {
                    if (result.event !== 'success') return;
                    const info = result.info as CloudinaryResult
                    setPublicId(info.public_id);
                    // setPublicId("sihdnptreuzhmbgfq4ri");
                }}>
                {({ open }) =>
                    <button
                        className='btn btn-primary'
                        onClick={() => open()}>Upload
                    </button>}
            </CldUploadWidget>
        </>
    )
}

export default UploadPage