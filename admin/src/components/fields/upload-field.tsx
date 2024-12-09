import React, { useState, useCallback } from 'react'
import { X } from 'lucide-react'
import { AxiosProgressEvent } from 'axios'
import { useApp } from '@/hooks/use-app'
import { File as FileType } from '@/types'
import { Input } from '@/components/ui/input'
import { IconReload } from '@tabler/icons-react'

interface IProps {
  name: string
  value: string
  onChange: (val: number) => void
}

export default function FileUploader({ name, value: val, onChange }: IProps) {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [value, setValue] = useState<string>(val)
  const [deleting, setDeleting] = useState<boolean>(false)
  const { request } = useApp()

  const uploadFile = (file: File) => {
    const formData = new FormData()
    if (file) {
      formData.append('file', file)
      request({
        method: 'post',
        url: '/file',
        data: formData,
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
          )
          setProgress(percentCompleted)
        },
      })
        .then(({ data }) => {
          setValue(String((data as FileType)?.id))
          onChange(Number((data as FileType)?.id))
          setUploading(false)
        })
        .catch(() => {
          setUploading(false)
        })
    }
  }

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0]

      if (selectedFile) {
        setFile(selectedFile)
        uploadFile(selectedFile)
      }
    },
    [uploadFile]
  )

  const handleRemove = useCallback(() => {
    setDeleting(true)
    request({
      url: '/file',
      method: 'delete',
      data: {
        ids: [Number(value)],
      },
    })
      .then(() => {
        setFile(null)
        setProgress(0)
        setUploading(false)
      })
      .finally(() => {
        setDeleting(false)
      })
  }, [value])

  return (
    <div className='mx-auto w-full'>
      <input type='hidden' name={name} value={value} />
      <Input type='file' onChange={handleFileChange} />
      {file && (
        <div className='mt-4'>
          <div className='mb-2 flex items-center justify-between'>
            <span className='text-sm text-gray-500'>{file.name}</span>
            {!uploading && (
              <button
                className='text-red-500 hover:text-red-700'
                aria-label='Remover arquivo'
                onClick={handleRemove}
                disabled={deleting}
              >
                {deleting ? (
                  <IconReload size={20} className='animate-spin' />
                ) : (
                  <X size={20} />
                )}
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
