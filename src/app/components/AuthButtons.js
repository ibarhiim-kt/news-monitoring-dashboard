"use client";

import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs';

export default function AuthButton() {
  const { isSignedIn } = useUser();

  return isSignedIn ? <SignOutButton /> : <SignInButton />;
}
