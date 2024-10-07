import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
    return (
        <main className="flex h-screen w-full flex-col items-center justify-center gap-10 bg-black">
            <SignIn ></SignIn>
        </main>
    );
};

export default SignInPage;