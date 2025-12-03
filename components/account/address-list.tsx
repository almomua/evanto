'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, Check } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

const mockAddresses: Address[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+1 234 567 8900',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    isDefault: true,
  },
  {
    id: '2',
    name: 'John Doe',
    phone: '+1 234 567 8901',
    address: '456 Oak Avenue',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    country: 'United States',
    isDefault: false,
  },
];

export function AddressList() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border border-[#BEBCBD]/30 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[#3C4242] text-2xl font-bold">Manage Addresses</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Address</span>
        </button>
      </div>

      {/* Address Cards */}
      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-20 h-20 bg-[#F6F6F6] rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-10 h-10 text-[#807D7E]" />
          </div>
          <p className="text-[#3C4242] text-lg font-medium mb-2">No addresses saved</p>
          <p className="text-[#807D7E]">Add an address for faster checkout</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`relative p-6 rounded-xl border-2 ${
                address.isDefault
                  ? 'border-[#8A33FD] bg-[#8A33FD]/5'
                  : 'border-[#BEBCBD]/30'
              }`}
            >
              {/* Default Badge */}
              {address.isDefault && (
                <span className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-[#8A33FD] text-white text-xs rounded-full">
                  <Check className="w-3 h-3" />
                  Default
                </span>
              )}

              {/* Address Info */}
              <div className="mb-4">
                <h4 className="text-[#3C4242] font-semibold mb-1">{address.name}</h4>
                <p className="text-[#807D7E] text-sm mb-2">{address.phone}</p>
                <p className="text-[#807D7E] text-sm">
                  {address.address}
                  <br />
                  {address.city}, {address.state} {address.zipCode}
                  <br />
                  {address.country}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#BEBCBD]/30">
                <button
                  onClick={() => setEditingId(address.id)}
                  className="flex items-center gap-1 text-[#8A33FD] hover:text-[#7229D6] transition-colors text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="text-[#807D7E] hover:text-[#3C4242] transition-colors text-sm ml-auto"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

