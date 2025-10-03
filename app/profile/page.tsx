import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UserProfile from "@/components/UserProfile";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-2xl w-full">
        <div className="mb-6 flex justify-between items-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            User Profile
          </h1>
          <p className="text-gray-600">
            Your authenticated user information
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <UserProfile session={session} />
          <LogoutButton />
        </div>

        <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Session Details
          </h3>
          <div className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
            <pre className="text-xs text-gray-800">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
