import './globals.css';
export const metadata = {
  title: 'Task Manager Dashboard',
  description: 'A full-stack dashboard for managing tasks and projects.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Task Manager Dashboard</title>
        <meta name="description" content="A full-stack dashboard for managing tasks and projects." />
        <link rel="icon" href="/logo.svg" />
      </head>
      <body>
        <header style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px'}}>
          <img src="/logo.svg" alt="Logo" width={40} height={40} />
          <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#2563EB'}}>Task Manager Dashboard</span>
        </header>
        {children}
      </body>
    </html>
  )
}
