// app/signup/page.jsx
"use client";
import { useState } from "react";
import { supabaseClient } from "../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const form = e.target;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      setLoading(false);
      return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    alert("Check your email for confirmation!");
    setLoading(false);
    router.push("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSignUp}
        className="max-w-md w-full bg-white p-8 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">Create an account</h2>

        {errorMsg && (
          <p className="text-red-500 text-sm">{errorMsg}</p>
        )}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <a href="/signin" className="text-purple-600 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
