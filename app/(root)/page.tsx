import HomeClient from "@/components/pages/home-client";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const HomePage = async () => {

  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  return (
    <HomeClient />
  );
};

export default HomePage;