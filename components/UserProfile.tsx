import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function UserProfile() {
  const { user } = useUser();
  const convexUser = useQuery(api.users?.getUser, { clerkId: user?.id ?? "" });
  const updateUser = useMutation(api.users?.updateUser);

  if (!user) return Loading user...;
  if (!convexUser) return User not found in database;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedUser = {
      // Get the updated user data from the form
      name: formData.get("name"),
      email: formData.get("email"),
    };
    await updateUser(updatedUser);
  };

  return (
    <div>
      <h1>{user.fullName}</h1>
      <p>{user.primaryEmailAddress?.emailAddress}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" defaultValue={user.fullName} />
        </label>
        <label>
          Email:
          <input type="email" name="email" defaultValue={user.primaryEmailAddress?.emailAddress} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}