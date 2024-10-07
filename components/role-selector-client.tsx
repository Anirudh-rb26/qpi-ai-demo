"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";

const roles = ["admin", "moderator", "role_a", "role_b", "role_c"];

interface RoleSelectorDropdownProps {
    user: {
        id: string;
        firstName: string | null;
        lastName: string | null;
        email: string | undefined;
        imageUrl: string;
        publicMetadata: UserPublicMetadata;
    };
}

export const RoleSelectorDropdown: React.FC<RoleSelectorDropdownProps> = ({ user }) => {
    const [selectedRole, setSelectedRole] = useState(user.publicMetadata.role ? String(user.publicMetadata.role) : null);

    const handleRoleChange = async (role: string) => {
        setSelectedRole(role);

        const payload = {
            userId: user.id,
            role,
        };

        try {
            const res = await fetch("/api/set-role", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to update role");
            }

            toast.success("Role Updated Successfully", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        } catch (error) {
            console.error("Error updating role:", error);
            toast.error("Error, Role could not be updated:", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="w-[200px] justify-between">
                    {selectedRole === null ? "Assign a Role" : selectedRole}
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {roles.map((role) => (
                    <DropdownMenuItem
                        key={role}
                        onClick={() => handleRoleChange(role)}>
                        {role}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
