import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="bg-[url('/../images/background.png')] bg-cover bg-no-repeat  bg-center md:bg-unset bg-fixed
    scrollbar-thin scrollbar-thumb-[#326C85] scrollbar-track-[#4A3470] scrollbar-thumb-rounded-lg">
      <body>{children}</body>
    </html>
  )
}