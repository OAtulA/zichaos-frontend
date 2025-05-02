"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying your email...");
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setError("Invalid verification link");
    }
  }, [token]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await api.get("/auth/verify", {
        params: { token },
        withCredentials: true, // Important for cookies
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setMessage("Email verified successfully!");
        // Store tokens in localStorage or state if needed
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      } else {
        setError("Failed to verify email");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to verify email");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-zinc-900 rounded-lg text-center">
        <p>Our dear page for the verify</p>
        {error ? (
          <>
            <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
            <p className="text-gray-300">{error}</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-purple-400 mb-4">Success</h1>
            <p className="text-gray-300">{message}</p>
          </>
        )}
      </div>
    </main>
  );
}
