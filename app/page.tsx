import { auth } from "@/auth";
import LoginButton from "@/components/LoginButton";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Google OAuth Example
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Demonstration of OAuth 2.0 authentication with Google and Next.js
        </p>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          {!session ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  Welcome!
                </h2>
                <p className="text-gray-600 mb-6">
                  Sign in with your Google account to continue
                </p>
              </div>
              <LoginButton />
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  Welcome back, {session.user?.name}!
                </h2>
                <p className="text-gray-600 mb-6">
                  You are successfully authenticated with Google OAuth
                </p>
              </div>
              <Link
                href="/profile"
                className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                View Profile
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 text-sm text-gray-600">
          <p className="mb-2">
            <strong>Features:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Google OAuth 2.0 authentication</li>
            <li>NextAuth.js integration</li>
            <li>Session management with JWT</li>
            <li>Protected routes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
