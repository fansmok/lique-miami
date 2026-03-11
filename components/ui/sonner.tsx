'use client'

import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        style: {
          background: '#2A1F1D',
          border: '1px solid rgba(242, 237, 229, 0.14)',
          color: '#F2EDE5',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
