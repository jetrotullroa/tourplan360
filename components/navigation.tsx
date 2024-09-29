"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Plane, Plus, Settings, Menu } from "lucide-react"

const navItems = [
  { name: "Trips", href: "/trips", icon: Plane },
  { name: "Create a Trip", href: "/create-trip", icon: Plus },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      {/* Desktop Side Navigation */}
      <div className="hidden lg:flex">
        <aside className="w-64 h-screen bg-background border-r">
          <ScrollArea className="h-full py-6 px-3">
            <h2 className="mb-6 px-4 text-lg font-semibold tracking-tight">TourPlan360</h2>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
        <nav className="flex justify-around py-2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive(item.href) ? "secondary" : "ghost"}
                className="flex-col px-2 py-1 h-auto"
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{item.name}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Side Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden fixed top-4 left-4 z-40">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 pt-10">
          <h2 className="mb-6 text-lg font-semibold tracking-tight">TourPlan360</h2>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}