import { UserProfile } from "@clerk/nextjs";

export default function UserProfilePage() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <UserProfile />
    </div>
  );
}
