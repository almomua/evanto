'use client';

import Image from 'next/image';
import { useAuth } from '@/lib/context/auth-context';
import { useModal } from '@/components/ui/modal';

interface AdminHeaderProps {
  title: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const { user, logout } = useAuth();
  const modal = useModal();

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AD';
  };

  return (
    <header className="h-[62px] flex items-center justify-between px-6 bg-white border-b border-gray-100">
      <h1 className="text-xl font-semibold text-[#3C4242]">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3C4242"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EF4444] text-white text-xs font-medium rounded-full flex items-center justify-center">
            4
          </span>
        </button>

        {/* Logout Button */}
        <button
          onClick={async () => {
            const confirmed = await modal.confirm('Are you sure you want to sign out?', 'Sign Out');
            if (confirmed) {
              logout();
            }
          }}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Sign out"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#1E6BFF] flex items-center justify-center">
            {user?.image?.secure_url ? (
              <Image src={user.image.secure_url} alt={user.name} width={40} height={40} className="object-cover" />
            ) : (
              <span className="text-white font-medium text-sm">{getInitials(user?.name || 'Admin')}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
