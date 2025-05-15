"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import GoogleLogo from "@/utils/GoogleLogo";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { getProviders } from "next-auth/react";
import type { ClientSafeProvider } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  const fetchProviders = async () => {
    const res = await getProviders();
    setProviders(res);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-sm px-5">
      {/* Logo */}
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          Asserty
        </Link>
      </div>

      {/* Navigation Links */}
      {user ? (
        <>
          <div className="flex-none hidden md:block mr-5">
            <ul className="menu menu-horizontal p-0">
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/investments">Investments</Link>
              </li>
            </ul>
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  width={40}
                  height={40}
                  src={user?.image || ""}
                  alt={`${user?.name} Avatar`}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <ul
                tabIndex={1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li className="md:hidden sm:block">
                  <a>Dashboard</a>
                </li>
                <li className="md:hidden sm:block">
                  <a>Investments</a>
                </li>
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={() => signOut()}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            {providers &&
              Object.values(providers).map((provider) => (
                <li key={provider.name}>
                  <button
                    onClick={() => signIn(provider.id)}
                    className="btn btn-soft btn-md"
                  >
                    {provider.name === "Google" && <GoogleLogo />}
                    <span className="ml-2">Sign In With {provider.name}</span>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
