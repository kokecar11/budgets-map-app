"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { Button } from "~/components/ui/button";
// import { cn } from "~/lib/utils";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Obtener iniciales para el avatar
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "BM";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 w-full items-center justify-between py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/budgets-map-logo.svg"
            alt="Budgets-map logo"
            width={40}
            height={40}
          />
          <span className="ml-2 text-lg font-semibold text-primary">
            Budgets Map
          </span>
        </Link>

        {/* Navegación Desktop */}
        {/* <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors hover:text-primary",
                pathname === link.href
                  ? "font-medium text-primary"
                  : "text-muted-foreground",
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav> */}

        <div className="flex items-center space-x-4">
          {/* Botón de tema */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button> */}

          {/* Autenticación */}
          {status === "loading" ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-muted"></div>
          ) : session && session?.error !== "RefreshTokenExpired" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={session.user?.image ?? ""} alt="Perfil" />
                  <AvatarFallback>
                    {getInitials(session.user?.name)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                  <p>{session.user.name}</p>
                  <p className="text-xs font-light text-muted-foreground">
                    {session.user?.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings">
                    <DropdownMenuItem className="cursor-pointer">
                      <span>Ajustes</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer"
                >
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => router.push("/login")} size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Iniciar sesión
            </Button>
          )}

          {/* Toggle menú móvil */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="container pb-4 md:hidden">
          <nav className="flex flex-col space-y-3">
            {/* {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-2 py-1 text-sm transition-colors hover:bg-accent",
                  pathname === link.href
                    ? "font-medium text-primary"
                    : "text-muted-foreground",
                )}
              >
                {link.title}
              </Link>
            ))} */}
            {/* <Button
              variant="ghost"
              size="sm"
              className="flex w-fit items-center justify-start"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <>
                  <Moon className="mr-2 h-4 w-4" /> Modo oscuro
                </>
              ) : (
                <>
                  <Sun className="mr-2 h-4 w-4" /> Modo claro
                </>
              )}
            </Button> */}
          </nav>
        </div>
      )}
    </header>
  );
}
