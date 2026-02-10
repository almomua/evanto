'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { ChevronRight, Loader2, LayoutDashboard } from 'lucide-react';
import { userApi, Address } from '@/lib/api/user';
import { useAuth } from '@/lib/context/auth-context';
import { useModal } from '@/components/ui/modal';
import { useTranslations } from 'next-intl';

// const mockAddresses = ... (removed)

interface ProfileInfoProps {
  user?: {
    name: string;
    email: string;
    phone: string;
    password?: string;
  };
}

export function ProfileInfo({ user: initialUser }: ProfileInfoProps) {
  const { user, logout } = useAuth();
  const modal = useModal();
  const t = useTranslations('account');
  const commonT = useTranslations('common');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (field: string, value: string) => {
    setEditingField(field);
    setEditValue(value);
  };

  const saveProfile = async () => {
    if (!editingField) return;
    setIsSaving(true);
    try {
      await userApi.updateProfile({ [editingField]: editValue });
      modal.success(t('successUpdate', { field: t(editingField) }), t('success'));
      setEditingField(null);
      // Ideally reload user or update context here. For now, a reload mimics it or assume AuthContext updates naturally if it re-fetches or we force it.
      // Usually logout() / login() refresh token, but here we just updated DB. 
      // We might need to manually update the local user object or refresh page.
      window.location.reload();
    } catch (error: any) {
      modal.error(error.response?.data?.message || 'Update failed', 'Error');
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await userApi.getAddresses();
        setAddresses(data);
      } catch (error) {
        console.error('Failed to fetch addresses', error);
      } finally {
        setLoadingAddresses(false);
      }
    };
    fetchAddresses();
  }, []);

  // Use AuthContext user if available, fallback to props or defaults
  const userData = {
    name: user?.name || initialUser?.name || 'User',
    email: user?.email || initialUser?.email || '',
    phone: user?.phone || initialUser?.phone || 'Not set',
    password: '••••••••',
  };

  /* Address Cards Grid Logic */
  const handleDeleteAddress = async (id: string) => {
    if (!await modal.confirm(t('confirmDeleteAddress'), t('remove'))) return;
    try {
      await userApi.deleteAddress(id);
      setAddresses(prev => prev.filter(a => a._id !== id));
      modal.success(t('successUpdate', { field: t('address') }));
    } catch (error) {
      console.error('Failed to delete address', error);
      modal.error('Failed to delete address');
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      // Optimistic update
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: a._id === id })));

      // Update in backend. We might need to unset others or the backend handles it.
      // Assuming backend sets this one to default and unsets others if logic exists.
      // If not, we might need to handle it. Usually backend handles "set as default".
      await userApi.updateAddress(id, { isDefault: true });
      modal.success('Default address updated');
    } catch (error) {
      console.error('Failed to set default address', error);
      // Revert on error
      const data = await userApi.getAddresses();
      setAddresses(data);
      modal.error('Failed to update default address');
    }
  };

  return (
    <div className="flex-1">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm mb-4 sm:mb-6 flex-wrap">
        <Link href="/" className="text-[#807D7E] hover:text-[#3C4242]">
          {commonT('home')}
        </Link>
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#807D7E] rtl:rotate-180" />
        <Link href="/account" className="text-[#807D7E] hover:text-[#3C4242]">
          {t('title')}
        </Link>
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#807D7E] rtl:rotate-180" />
        <span className="text-[#3C4242]">{t('personalInfo')}</span>
      </nav>

      {/* My Info Heading */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-[#3C4242] text-xl sm:text-2xl font-semibold">{t('myInfo')}</h1>
        <div className="flex items-center gap-3">
          {user?.role === 'admin' && (
            <Link
              href="/admin"
              className="px-4 py-2 bg-[#8A33FD] text-white rounded-lg text-sm font-medium hover:bg-[#7229D6] transition-colors flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t('adminDashboard')}</span>
            </Link>
          )}
          <button
            onClick={async () => {
              const confirmed = await modal.confirm(t('confirmLogout'), t('logout'));
              if (confirmed) {
                logout();
              }
            }}
            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
          >
            {t('logout')}
          </button>
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="mb-8 sm:mb-10">
        <h2 className="text-[#3C4242] text-base sm:text-lg font-medium mb-4 sm:mb-6">{t('contactDetails')}</h2>

        {/* Form Fields */}
        <div className="space-y-4 sm:space-y-6">
          {/* Your Name */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#BEBCBD]/30">
            <div className="min-w-0 flex-1">
              <label className="block text-[#807D7E] text-xs sm:text-sm mb-1">{t('yourName')}</label>
              <p className="text-[#3C4242] text-sm sm:text-base truncate">{userData.name}</p>
            </div>
            <button
              onClick={() => handleEdit('name', userData.name)}
              className="text-[#807D7E] hover:text-[#3C4242] text-xs sm:text-sm transition-colors ml-4 rtl:ml-0 rtl:mr-4 flex-shrink-0"
            >
              {t('change')}
            </button>
          </div>

          {/* Email Address */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#BEBCBD]/30">
            <div className="min-w-0 flex-1">
              <label className="block text-[#807D7E] text-xs sm:text-sm mb-1">{t('emailAddress')}</label>
              <p className="text-[#3C4242] text-sm sm:text-base truncate">{userData.email}</p>
            </div>
            <button
              onClick={() => handleEdit('email', userData.email)}
              className="text-[#807D7E] hover:text-[#3C4242] text-xs sm:text-sm transition-colors ml-4 rtl:ml-0 rtl:mr-4 flex-shrink-0"
            >
              {t('change')}
            </button>
          </div>

          {/* Phone Number */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#BEBCBD]/30">
            <div className="min-w-0 flex-1">
              <label className="block text-[#807D7E] text-xs sm:text-sm mb-1">{t('phoneNumber')}</label>
              <p className="text-[#3C4242] text-sm sm:text-base">{userData.phone}</p>
            </div>
            <button
              onClick={() => handleEdit('phone', userData.phone)}
              className="text-[#807D7E] hover:text-[#3C4242] text-xs sm:text-sm transition-colors ml-4 rtl:ml-0 rtl:mr-4 flex-shrink-0"
            >
              {t('change')}
            </button>
          </div>

          {/* Password (Disable edit for now) */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#BEBCBD]/30">
            <div className="min-w-0 flex-1">
              <label className="block text-[#807D7E] text-xs sm:text-sm mb-1">{t('password')}</label>
              <p className="text-[#3C4242] text-sm sm:text-base">{userData.password}</p>
            </div>
            <button className="text-[#807D7E] hover:text-[#3C4242] text-xs sm:text-sm transition-colors ml-4 rtl:ml-0 rtl:mr-4 flex-shrink-0 opacity-50 cursor-not-allowed">
              {t('change')}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingField && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-[#3C4242] mb-4 capitalize">{t('changeField', { field: t(editingField) })}</h3>
            <input
              type={editingField === 'email' ? 'email' : 'text'}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-4 py-2 border border-[#BEBCBD] rounded-lg mb-4 focus:outline-none focus:border-[#8A33FD]"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingField(null)}
                className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                disabled={isSaving}
              >
                {t('cancel')}
              </button>
              <button
                onClick={saveProfile}
                className="px-4 py-2 bg-[#8A33FD] text-white rounded-lg hover:bg-[#7229D6] disabled:opacity-50"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : t('save')}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Address Section */}
      <div>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-[#3C4242] text-lg sm:text-xl font-medium">{t('address')}</h2>
          <Link
            href="/account/addresses/new"
            className="text-[#807D7E] hover:text-[#3C4242] text-xs sm:text-sm transition-colors"
          >
            {t('addNew')}
          </Link>
        </div>

        {/* Address Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {loadingAddresses ? (
            <div className="col-span-full flex justify-center py-8"><Loader2 className="animate-spin" /></div>
          ) : addresses.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-4">{t('noAddresses')}</div>
          ) : (
            addresses.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                onDelete={() => handleDeleteAddress(address._id)}
                onSetDefault={() => handleSetDefault(address._id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function AddressCard({ address, onDelete, onSetDefault }: { address: Address, onDelete: () => void, onSetDefault: () => void }) {
  const t = useTranslations('account');
  const hasDefaultTag = address.isDefault;

  return (
    <div className="border border-[#BEBCBD]/50 rounded-lg sm:rounded-xl p-4 sm:p-5">
      {/* Name */}
      <h3 className="text-[#3C4242] font-medium text-sm sm:text-base mb-1 sm:mb-2">{address.firstName} {address.lastName}</h3>

      {/* Phone */}
      <p className="text-[#807D7E] text-xs sm:text-sm mb-2 sm:mb-3">{address.phoneNumber}</p>

      {/* Address */}
      <p className="text-[#807D7E] text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
        {address.address1}, {address.city}, {address.state} {address.postalCode}, {address.country}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        <span
          className="px-2 sm:px-3 py-0.5 sm:py-1 border border-[#BEBCBD] rounded-md text-[#3C4242] text-[10px] sm:text-xs"
        >
          {address.isDefault ? t('default') : t('other')}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
        <button onClick={onDelete} className="text-[#807D7E] hover:text-red-500 transition-colors">
          {t('remove')}
        </button>
        <Link href={`/account/addresses/${address._id}`} className="text-[#807D7E] hover:text-[#3C4242] transition-colors">
          {t('edit')}
        </Link>
        {!hasDefaultTag && (
          <button onClick={onSetDefault} className="text-[#807D7E] hover:text-[#3C4242] transition-colors">
            {t('setAsDefault')}
          </button>
        )}
      </div>
    </div>
  );
}
