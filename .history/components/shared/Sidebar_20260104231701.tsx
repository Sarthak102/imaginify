"use client";

import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            {/* Main nav */}
            <ul className="sidebar-nav_elements">
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname;

                return (
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group ${
                      isActive
                        ? "bg-purple-gradient text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <Link className="sidebar-link" href={link.route}>
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={24}
                        height={24}
                        className={isActive ? "brightness-200" : ""}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Secondary nav + profile */}
            <ul className="sidebar-nav_elements">
              {navLinks.slice(6).map((link) => {
                const isActive = link.route === pathname;

                return (
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group ${
                      isActive
                        ? "bg-purple-gradient text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <Link className="sidebar-link" href={link.route}>
                      <Image
                        src={link.icon}
                        alt={link.label}
                        width={24}
                        height={24}
                        className={isActive ? "brightness-200" : ""}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}

              {/* Divider */}
              <hr className="my-2 border-gray-200" />

              {/* User + Logout */}
              <li className="flex flex-col gap-3 p-4">
                <UserButton afterSignOutUrl="/" showName />

                <SignOutButton redirectUrl="/">
                  <button className="w-full rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600">
                    Logout
                  </button>
                </SignOutButton>
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
