import { Church } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Church className="h-6 w-6" />
          <span className="text-lg font-semibold">Calendário da igreja.</span>
        </div>
        {/* <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link href="/services" className="text-sm font-medium hover:underline">
            Services
          </Link>
          <Link href="/volunteers" className="text-sm font-medium hover:underline">
            Volunteers
          </Link>
        </nav> */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" size="sm">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}
