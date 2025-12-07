'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  tags: string[];
  isDefault?: boolean;
}

const mockAddresses: Address[] = [
  {
    id: '1',
    name: 'Jhanvi shah',
    phone: '8980252445',
    address: '1/4 Pragatinagar Flats, opp. jain derasar , near Jain derasar, Vijaynagar road',
    tags: ['Home', 'Default billing address'],
    isDefault: true,
  },
  {
    id: '2',
    name: 'Jhanvi shah',
    phone: '8980252445',
    address: '1/4 Pragatinagar Flats, opp. jain derasar , near Jain derasar, Vijaynagar road',
    tags: ['Home', 'Default shipping address'],
  },
  {
    id: '3',
    name: 'Jhanvi shah',
    phone: '8980252445',
    address: '1/4 Pragatinagar Flats, opp. jain derasar , near Jain derasar, Vijaynagar road',
    tags: ['Office'],
  },
  {
    id: '4',
    name: 'Jhanvi shah',
    phone: '8980252445',
    address: '1/4 Pragatinagar Flats, opp. jain derasar , near Jain derasar, Vijaynagar road',
    tags: ['Home2'],
  },
];

interface ProfileInfoProps {
  user?: {
    name: string;
    email: string;
    phone: string;
    password?: string;
  };
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const [userData] = useState({
    name: user?.name || 'Jhanvi Shah',
    email: user?.email || 'Jhanvi@gmail.com',
    phone: user?.phone || '8980252445',
    password: '••••••••',
  });

  const [addresses] = useState<Address[]>(mockAddresses);

  return (
    <div className="flex-1">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-[#807D7E] hover:text-[#3C4242]">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-[#807D7E]" />
        <Link href="/account" className="text-[#807D7E] hover:text-[#3C4242]">
          My Account
        </Link>
        <ChevronRight className="w-4 h-4 text-[#807D7E]" />
        <span className="text-[#3C4242]">Personal Info</span>
      </nav>

      {/* My Info Heading */}
      <h1 className="text-[#3C4242] text-2xl font-semibold mb-6">My Info</h1>

      {/* Contact Details Section */}
      <div className="mb-10">
        <h2 className="text-[#3C4242] text-lg font-medium mb-6">Contact Details</h2>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Your Name */}
          <div className="flex items-center justify-between pb-4 border-b border-[#BEBCBD]/30">
            <div>
              <label className="block text-[#807D7E] text-sm mb-1">Your Name</label>
              <p className="text-[#3C4242] text-base">{userData.name}</p>
            </div>
            <button className="text-[#807D7E] hover:text-[#3C4242] text-sm transition-colors">
              Change
            </button>
          </div>

          {/* Email Address */}
          <div className="flex items-center justify-between pb-4 border-b border-[#BEBCBD]/30">
            <div>
              <label className="block text-[#807D7E] text-sm mb-1">Email Address</label>
              <p className="text-[#3C4242] text-base">{userData.email}</p>
            </div>
            <button className="text-[#807D7E] hover:text-[#3C4242] text-sm transition-colors">
              Change
            </button>
          </div>

          {/* Phone Number */}
          <div className="flex items-center justify-between pb-4 border-b border-[#BEBCBD]/30">
            <div>
              <label className="block text-[#807D7E] text-sm mb-1">Phone Number</label>
              <p className="text-[#3C4242] text-base">{userData.phone}</p>
            </div>
            <button className="text-[#807D7E] hover:text-[#3C4242] text-sm transition-colors">
              Change
            </button>
          </div>

          {/* Password */}
          <div className="flex items-center justify-between pb-4 border-b border-[#BEBCBD]/30">
            <div>
              <label className="block text-[#807D7E] text-sm mb-1">Password</label>
              <p className="text-[#3C4242] text-base">{userData.password}</p>
            </div>
            <button className="text-[#807D7E] hover:text-[#3C4242] text-sm transition-colors">
              Change
            </button>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#3C4242] text-xl font-medium">Address</h2>
          <Link
            href="/account/addresses/new"
            className="text-[#807D7E] hover:text-[#3C4242] text-sm transition-colors"
          >
            Add New
          </Link>
        </div>

        {/* Address Cards Grid */}
        <div className="grid grid-cols-2 gap-6">
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AddressCard({ address }: { address: Address }) {
  const hasDefaultTag = address.tags.some(tag => 
    tag.includes('Default billing') || tag.includes('Default shipping')
  );

  return (
    <div className="border border-[#BEBCBD]/50 rounded-xl p-5">
      {/* Name */}
      <h3 className="text-[#3C4242] font-medium mb-2">{address.name}</h3>
      
      {/* Phone */}
      <p className="text-[#807D7E] text-sm mb-3">{address.phone}</p>
      
      {/* Address */}
      <p className="text-[#807D7E] text-sm mb-4 leading-relaxed">{address.address}</p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {address.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 border border-[#BEBCBD] rounded-md text-[#3C4242] text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-4 text-sm">
        <button className="text-[#807D7E] hover:text-red-500 transition-colors">
          Remove
        </button>
        <button className="text-[#807D7E] hover:text-[#3C4242] transition-colors">
          Edit
        </button>
        {!hasDefaultTag && (
          <button className="text-[#807D7E] hover:text-[#3C4242] transition-colors">
            Set as default.
          </button>
        )}
      </div>
    </div>
  );
}
