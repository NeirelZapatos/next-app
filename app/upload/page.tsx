'use client';
import React, { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary';

const UploadPage = () => {
    const [publicId, setPublicId] = useState('');
    return (
        <CldUploadWidget
            uploadPreset='testing'
            onSuccess={(result, widget) => {
                console.log(result);
            }}>
            {({ open }) =>
                <button
                    className='btn btn-primary'
                    onClick={() => open()}>Upload
                </button>}
        </CldUploadWidget>
    )
}

export default UploadPage