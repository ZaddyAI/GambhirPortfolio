import React from 'react'

export const metadata = {
  title: 'Gambhir Resume',
}

export default function Page() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <iframe
        src="/gambhir.pdf"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </div>
  )
}