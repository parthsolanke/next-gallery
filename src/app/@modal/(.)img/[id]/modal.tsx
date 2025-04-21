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
      className="absolute h-screen w-screen bg-zinc-900/50"
      onClose={onDismiss}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root')!
  )
}
