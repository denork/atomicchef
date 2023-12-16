
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

interface HomeLayoutProps {
  children: React.ReactNode
}

export default async function HomeLayout({ children }: HomeLayoutProps) {

  return (
    <div className="relative flex min-h-screen flex-col mt-5">
      <div className="mx-auto flex-1">{children}</div>
      <SiteFooter />
    </div>
  )
}
