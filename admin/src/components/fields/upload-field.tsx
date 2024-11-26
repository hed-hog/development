import React, { useState, useCallback } from 'react'
import { X } from 'lucide-react'

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0]
      if (selectedFile) {
        setFile(selectedFile)
        simulateUpload()
      }
    },
    []
  )

  const simulateUpload = useCallback(() => {
    setUploading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setUploading(false)
          return 100
        }
        return prevProgress + 10
      })
    }, 500)
  }, [])

  const handleRemove = useCallback(() => {
    setFile(null)
    setProgress(0)
    setUploading(false)
  }, [])

  return (
    <div className='mx-auto w-full max-w-md p-4'>
      <div className='mb-4'>
        <label
          htmlFor='file-upload'
          className='mb-2 block text-sm font-medium text-gray-700'
        >
          Upload de arquivo
        </label>
        <input
          id='file-upload'
          type='file'
          onChange={handleFileChange}
          className='block w-full text-sm text-gray-500
            file:mr-4 file:rounded-full file:border-0
            file:bg-blue-50 file:px-4
            file:py-2 file:text-sm
            file:font-semibold file:text-blue-700
            hover:file:bg-blue-100'
        />
      </div>
      {file && (
        <div className='mt-4'>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-sm text-gray-500'>{file.name}</span>
            {!uploading && (
              <button
                onClick={handleRemove}
                className='text-red-500 hover:text-red-700'
                aria-label='Remover arquivo'
              >
                <X size={20} />
              </button>
            )}
          </div>
          <div className='h-1 w-full overflow-hidden rounded-full bg-gray-200'>
            <div
              className='h-1 bg-blue-500 transition-all duration-500 ease-out'
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className='mt-1 text-right'>
            <span className='text-xs text-gray-500'>{progress}%</span>
          </div>
        </div>
      )}
    </div>
  )
}
