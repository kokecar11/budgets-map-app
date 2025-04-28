import Link from "next/link";
import { Github, Twitter, Coffee, Mail, Star } from "lucide-react";
import { Button } from "~/components/ui/button";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-muted py-8">
      <div className="container mx-auto w-full md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Columna 1: Información del proyecto */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Image
                  src="/budgets-map-logo.svg"
                  alt="Budgets-map logo"
                  width={40}
                  height={40}
                />
              </div>
              <h3 className="text-lg font-bold">Budgets Map</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              A tool of financial management that helps you visualize and
              control your expenses effectively. With Budgets Map, you can
              create personalized budgets and track your progress in real time.
            </p>
            <div className="flex items-center space-x-1 text-sm">
              <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                v0.1.0-beta
              </span>
              <span className="ml-2 text-xs text-muted-foreground">
                Last update: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Columna 2: Enlaces del proyecto */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Project</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="flex items-center text-sm hover:underline"
                >
                  <Star className="mr-2 h-4 w-4" />
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center text-sm hover:underline"
                >
                  <Coffee className="mr-2 h-4 w-4" />
                  Support the project
                </Link>
              </li>
            </ul>

            <h3 className="mt-6 text-base font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Creador y contacto */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold"></h3>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted-foreground/20">
                <span className="text-sm font-medium">KC</span>
              </div>
              <div>
                <p className="text-sm font-medium">Koke Carpintero</p>
                <p className="text-xs text-muted-foreground">
                  Indie Creator | Developer
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm">
                Do you have any questions or suggestions?
              </p>
              <Button
                variant="outline"
                size="sm"
                className="flex w-full items-center justify-center"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact me
              </Button>
            </div>

            <div className="mt-4 flex space-x-3">
              <Link
                href="https://github.com/kokecar11"
                aria-label="GitHub"
                className="hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://x.com/Kokecar11"
                aria-label="Twitter"
                className="hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="Buy Me a Coffee"
                className="hover:text-primary"
              >
                <Coffee className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Derechos de autor y enlaces legales - Versión simplificada */}
        <div className="mt-8 grid w-full grid-cols-1 gap-4 border-t border-border pt-6 md:grid-cols-2">
          <p className="text-center text-xs text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Budgets Map. Made with ❤️ from Bogotá,
            Colombia.
          </p>
          <div className="flex justify-center space-x-4 md:justify-end">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
