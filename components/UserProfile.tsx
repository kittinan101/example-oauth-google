import { Session } from "next-auth";
import Image from "next/image";

interface UserProfileProps {
  session: Session;
}

export default function UserProfile({ session }: UserProfileProps) {
  const { user } = session;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <div className="flex flex-col items-center">
        {user.image && (
          <div className="relative w-24 h-24 mb-4">
            <Image
              src={user.image}
              alt={user.name || "User avatar"}
              fill
              className="rounded-full object-cover"
            />
          </div>
        )}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {user.name || "Anonymous User"}
        </h2>
        <p className="text-gray-600 mb-6">{user.email}</p>

        <div className="w-full bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Profile Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">User ID:</span>
              <span className="text-sm text-gray-900 font-mono">{user.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Email:</span>
              <span className="text-sm text-gray-900">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Name:</span>
              <span className="text-sm text-gray-900">{user.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
