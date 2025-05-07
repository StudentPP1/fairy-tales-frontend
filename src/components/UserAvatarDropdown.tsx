import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const UserAvatarDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Обробка кліків поза компонентом для автоматичного закриття дропдауна
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            {/* Аватар користувача */}
            <Avatar onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                <AvatarImage
                    src="https://cs4.pikabu.ru/post_img/big/2016/06/12/6/1465724507186691432.jpg"
                    alt="User Avatar"
                    className="h-10 w-10"
                />
                <AvatarFallback />
            </Avatar>

            {/* Дропдаун-модальне вікно */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu">
                        <button
                            type="button"
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => {
                                // Логіка переходу до налаштувань
                                console.log('Settings clicked');
                            }}
                        >
                            Settings
                        </button>
                        <button
                            type="button"
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => {
                                // Логіка виходу
                                console.log('Logout clicked');
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAvatarDropdown;
