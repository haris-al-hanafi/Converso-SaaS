import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'
import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignOutButton,
  UserButton
} from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='navbar'>
      {/* Logo Section */}
      <Link href="/" className='flex items-center'>
        <Image
          src="/images/logo.svg"
          alt='Converso Logo'
          height={46}
          width={46}
          priority
        />
      </Link>

      {/* Navigation and Auth Section */}
      <div className='flex items-center gap-8'>
        <NavItems />

        {/* Auth Buttons */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className='btn-signin'>
              Sign in
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: 'w-12 h-12'
              }
            }}
          />
          <SignOutButton>
            <button className='btn-signout'>
              <Image src="/icons/logout.svg" width={20} height={20} alt='logout' />

            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </nav>
  )
}

export default Navbar