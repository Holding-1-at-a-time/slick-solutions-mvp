import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function UserProfile() {
  const { user } = useUser();
  const convexUser = useQuery(api.users?.getUser, { clerkId: user?.id ?? "" });
  const updateUser = useMutation(api.users?.updateUser);

  if (!user) return Loading user...;
  if (!convexUser) return User not found in database;

  return (
    <div>
      <h1>{user.fullName}</h1>
      <p>{user.primaryEmailAddress?.emailAddress}</p>
      {/* Add form to update user details */}
    </div>
  );
}
