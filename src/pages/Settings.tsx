import React, { useState, type FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const UserSettingsPage: FC = () => {
    // Початкові значення можуть надходити з контексту або API, тут для прикладу використовуються фіктивні дані
    const [name, setName] = useState<string>("John Doe");
    const [imageUrl, setImageUrl] = useState<string>(
        "https://i.pinimg.com/736x/b8/78/97/b878975dc2ba1407777ba8f7f243ee8d.jpg"
    );
    const [emailNotification, setEmailNotification] = useState<boolean>(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Виконайте логіку збереження, наприклад, API-запит або оновлення контексту
        console.log("Settings saved:", { name, imageUrl, emailNotification });
    };

    return (
        <div className="p-8 max-w-lg mx-auto">
            <h1 className="text-3xl font-bold mb-6">User Settings</h1>
            <form onSubmit={handleSave} className="space-y-6">
                {/* Inpuyt для зміни імені */}
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
                {/* Input для зміни URL зображення */}
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
                {/* Перемикач для підписки на email-повідомлення */}
                <div className="flex items-center">
                    <Switch
                        id="emailNotification"
                        checked={emailNotification}
                        onCheckedChange={setEmailNotification} // React's controlled component approach
                        className="mr-3 cursor-pointer"
                    />

                    <label className="text-sm font-medium">
                        Email notifications for new stories
                    </label>
                </div>
                {/* Кнопка збереження */}
                <Button type="submit" className="w-full cursor-pointer">
                    Save Settings
                </Button>
            </form>

            <Button className="danger w-full p-5 mt-6 cursor-pointer" onClick={() => console.log("Logout")}>
                Log out
            </Button>
        </div>
    );
};

export default UserSettingsPage;
