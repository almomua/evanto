'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, CreditCard, Check } from 'lucide-react';

interface PaymentCard {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  lastFour: string;
  expiry: string;
  holderName: string;
  isDefault: boolean;
}

const mockCards: PaymentCard[] = [
  {
    id: '1',
    type: 'visa',
    lastFour: '4242',
    expiry: '12/25',
    holderName: 'John Doe',
    isDefault: true,
  },
  {
    id: '2',
    type: 'mastercard',
    lastFour: '8888',
    expiry: '06/26',
    holderName: 'John Doe',
    isDefault: false,
  },
];

const cardBrands = {
  visa: { name: 'Visa', color: 'bg-blue-500' },
  mastercard: { name: 'Mastercard', color: 'bg-red-500' },
  amex: { name: 'American Express', color: 'bg-blue-700' },
};

export function SavedCards() {
  const [cards, setCards] = useState<PaymentCard[]>(mockCards);

  const handleSetDefault = (id: string) => {
    setCards((prev) =>
      prev.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border border-[#BEBCBD]/30 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[#3C4242] text-2xl font-bold">Saved Cards</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Card</span>
        </button>
      </div>

      {/* Cards List */}
      {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-20 h-20 bg-[#F6F6F6] rounded-full flex items-center justify-center mb-4">
            <CreditCard className="w-10 h-10 text-[#807D7E]" />
          </div>
          <p className="text-[#3C4242] text-lg font-medium mb-2">No cards saved</p>
          <p className="text-[#807D7E]">Add a card for faster checkout</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`relative p-6 rounded-xl border-2 ${
                card.isDefault
                  ? 'border-[#8A33FD] bg-[#8A33FD]/5'
                  : 'border-[#BEBCBD]/30'
              }`}
            >
              {/* Default Badge */}
              {card.isDefault && (
                <span className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-[#8A33FD] text-white text-xs rounded-full">
                  <Check className="w-3 h-3" />
                  Default
                </span>
              )}

              {/* Card Visual */}
              <div
                className={`w-full h-32 rounded-lg ${cardBrands[card.type].color} p-4 mb-4 text-white`}
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="text-sm opacity-80">{cardBrands[card.type].name}</span>
                  <CreditCard className="w-8 h-8 opacity-80" />
                </div>
                <p className="text-lg tracking-widest">•••• •••• •••• {card.lastFour}</p>
              </div>

              {/* Card Info */}
              <div className="mb-4">
                <p className="text-[#3C4242] font-medium">{card.holderName}</p>
                <p className="text-[#807D7E] text-sm">Expires {card.expiry}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#BEBCBD]/30">
                <button className="flex items-center gap-1 text-[#8A33FD] hover:text-[#7229D6] transition-colors text-sm">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                {!card.isDefault && (
                  <button
                    onClick={() => handleSetDefault(card.id)}
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

