// app/not-found.tsx
import { Slot } from '@/components/Slot'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-full p-8">
        <h1 className="text-4xl font-semibold mb-4">Page Not Found</h1>
        <p className="text-lg mb-6">
          Oops—this page doesn’t exist. Try heading back home.
        </p>
        <Link
          href="/"
          className="px-4 py-2 border rounded"
        >
          Return to Gallery
        </Link>
      </main>
      <Slot name="modal" />
    </>
  )
}
