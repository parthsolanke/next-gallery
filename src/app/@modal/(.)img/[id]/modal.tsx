'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) {
      dialog.showModal()
    }

    const handleCancel = (e: Event) => {
      e.preventDefault()
      router.back()
    }

    dialog?.addEventListener('cancel', handleCancel)

    return () => {
      dialog?.removeEventListener('cancel', handleCancel)
    }
  }, [router])

  function onDismiss() {
    router.back()
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="absolute h-screen w-screen bg-black/90"
      onClose={onDismiss}
    >
      <button
        onClick={onDismiss}
        className="absolute top-4 right-4 p-2 text-white hover:opacity-75 cursor-pointer"
      >
        ✕
      </button>
      {children}
    </dialog>,
    document.getElementById('modal-root')!
  )
}
