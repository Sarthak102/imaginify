"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
              />
            </SheetTrigger>

            <SheetContent className="sheet-content sm:w-64">
              <div className="flex flex-col gap-6">
                <Image
                  src="/assets/images/logo-text.svg"
                  alt="logo"
                  width={152}
                  height={23}
                />

                <ul className="header-nav_elements">
                  {navLinks.map((link) => {
                    const isActive = link.route === pathname;

                    return (
                      <li
                        key={link.route}
                        className={`p-18 flex whitespace-nowrap ${
                          isActive
                            ? "gradient-text"
                            : "text-dark-700"
                        }`}
                      >
                        <Link
                          href={link.route}
                          className="sidebar-link cursor-pointer"
                        >
                          <Image
                            src={link.icon}
                            alt={link.label}
                            width={24}
                            height={24}
                          />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Divider */}
                <hr className="border-gray-200" />

                {/* Logout */}
                <SignOutButton redirectUrl="/">
                  <button className="w-full rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600">
                    Logout
                  </button>
                </SignOutButton>
              </div>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;