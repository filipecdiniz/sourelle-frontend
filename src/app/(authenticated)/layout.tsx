import '../globals.css'

export const metadata = {
  title: 'Sourelle Admin',
  description: 'Sourelle Admin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
