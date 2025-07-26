import { HeaderPublic } from "@/components/layout/header-public"
import { Footer } from "@/components/layout/footer"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderPublic />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
} 