import Link from "next/link";
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar";
import GitHubLogo from "@/components/icons/github-logo";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
        <div className="flex flex-col gap-6 row-start-2 items-center sm:items-start max-w-2xl">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h1 className="text-4xl tracking-tighter text-balance max-lg:font-medium sm:text-5xl lg:text-6xl xl:text-8xl">Ruby on Rails backend.<br/>NextJS frontend.</h1>
            <p className="text-xl text-muted-foreground text-balance">A complete authentication starter with user registration, sessions, and password recovery — powered by Rails API and Next.js</p>
          </div>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Button variant="default" size="lg" asChild>
              <Link 
                href="https://github.com/georgekettle/nextjs_starter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <GitHubLogo className="w-5 h-5" />
                NextJS Starter
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link 
                href="https://github.com/georgekettle/rails_api_starter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <GitHubLogo className="w-5 h-5" />
                Rails API Starter
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
