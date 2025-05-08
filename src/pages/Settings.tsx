import React, { useContext, useState, type FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AuthContext, type AuthState } from "@/context/AuthContext";
import { UserService } from "@/api/service/UserService";
import { AuthService } from "@/api/service/AuthService";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";

const UserSettingsPage: FC = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext<AuthState>(AuthContext);
    const [name, setName] = useState<string | undefined>(user?.name);
    const [imageUrl, setImageUrl] = useState<string | undefined>(user?.img);
    const [emailNotification, setEmailNotification] = useState<boolean>(user?.isSubscribed || false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        await UserService.updateUser(name || "", emailNotification, imageUrl || "").then((user) => {
            setUser(user);
        }).catch((error) => {
            console.error("Error updating user:", error);
        });
    };

    return (
        <>
            <NavBar />
            <div className="p-8 max-w-lg mx-auto">
                <h1 className="text-3xl font-bold mb-6">User Settings</h1>
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="mt-1 w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                            Profile Image URL
                        </label>
                        <Input
                            id="imageUrl"
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Enter your image URL"
                            className="mt-1 w-full"
                        />
                    </div>
                    <div className="flex items-center">
                        <Switch
                            id="emailNotification"
                            checked={emailNotification}
                            onCheckedChange={() => setEmailNotification(!emailNotification)}
                            className="mr-3 cursor-pointer"
                        />

                        <label className="text-sm font-medium">
                            Email notifications for new stories
                        </label>
                    </div>
                    <Button type="submit" className="w-full cursor-pointer">
                        Save Settings
                    </Button>
                </form>

                <Button className="danger w-full p-5 mt-6 cursor-pointer" onClick={() => {
                    AuthService.logout();
                    navigate("/login", { replace: true });
                }}>
                    Log out
                </Button>
            </div>
        </>
    );
};

export default UserSettingsPage;
