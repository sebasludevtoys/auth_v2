import { spawn } from "child_process";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";

const navigation = [
  { name: "Solutions", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Company", href: "#" },
];

export default function Example() {
  const { status, data } = useSession();
  const handleClick = () => {
    if (status === "authenticated") signOut();
    else
      signIn("github", {
        callbackUrl: "http://localhost:3000/",
        redirect: false,
      });
  };
  return (
    <header className='bg-indigo-600'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' aria-label='Top'>
        <div className='w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none'>
          <div className='flex items-center'>
            <span className='sr-only'>Workflow</span>
            <div className='hidden ml-10 space-x-8 lg:block'>
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className='text-base font-medium text-white hover:text-indigo-50'
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className='ml-10 space-x-4'>
            <button onClick={handleClick}>
              {status === "authenticated" ? "logout" : "login"}
            </button>
          </div>
        </div>
        <div className='py-4 flex flex-wrap justify-center space-x-6 lg:hidden'>
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className='text-base font-medium text-white hover:text-indigo-50'
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
