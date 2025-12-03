'use client';

import { useState } from 'react';
import { Camera, Edit2 } from 'lucide-react';

interface ProfileInfoProps {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar?: string;
  };
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || 'John',
    lastName: user?.lastName || 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1 234 567 8900',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save profile data
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl border border-[#BEBCBD]/30 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[#3C4242] text-2xl font-bold">My Info</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-[#8A33FD] hover:text-[#7229D6] transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        )}
      </div>

      {/* Avatar Section */}
      <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#BEBCBD]/30">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-[#8A33FD] flex items-center justify-center">
            <span className="text-white text-3xl font-bold">
              {formData.firstName.charAt(0).toUpperCase()}
            </span>
          </div>
          {isEditing && (
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#8A33FD] rounded-full flex items-center justify-center text-white hover:bg-[#7229D6] transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          )}
        </div>
        <div>
          <h3 className="text-[#3C4242] text-xl font-semibold">
            {formData.firstName} {formData.lastName}
          </h3>
          <p className="text-[#807D7E]">{formData.email}</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              First Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] focus:outline-none focus:border-[#8A33FD]"
              />
            ) : (
              <p className="text-[#3C4242] text-lg">{formData.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-[#3C4242] text-sm font-medium mb-2">
              Last Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] focus:outline-none focus:border-[#8A33FD]"
              />
            ) : (
              <p className="text-[#3C4242] text-lg">{formData.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-[#3C4242] text-sm font-medium mb-2">
            Email Address
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] focus:outline-none focus:border-[#8A33FD]"
            />
          ) : (
            <p className="text-[#3C4242] text-lg">{formData.email}</p>
          )}
        </div>

        <div>
          <label className="block text-[#3C4242] text-sm font-medium mb-2">
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#BEBCBD] rounded-lg text-[#3C4242] focus:outline-none focus:border-[#8A33FD]"
            />
          ) : (
            <p className="text-[#3C4242] text-lg">{formData.phone}</p>
          )}
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-8 py-3 border border-[#3C4242] text-[#3C4242] rounded-lg hover:bg-[#3C4242] hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Password Section */}
      <div className="mt-8 pt-8 border-t border-[#BEBCBD]/30">
        <h3 className="text-[#3C4242] text-lg font-semibold mb-4">Password</h3>
        <button className="text-[#8A33FD] hover:text-[#7229D6] transition-colors">
          Change Password
        </button>
      </div>
    </div>
  );
}

