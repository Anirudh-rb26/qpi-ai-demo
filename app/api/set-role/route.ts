import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, role } = await request.json();

    // Update user role using Clerk API
    const res = await clerkClient.users.updateUser(userId, {
      publicMetadata: { role },
    });

    return NextResponse.json({ message: "Role updated", res });
  } catch (error) {
    return NextResponse.json({ message: "Error updating role", error }, { status: 500 });
  }
}
