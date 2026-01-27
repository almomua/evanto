'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ChevronRight, ChevronDown, Loader2 } from 'lucide-react';
import { userApi } from '@/lib/api/user';

export default function EditAddressPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: '',
        company: '',
        streetAddress: '',
        apt: '',
        city: '',
        state: '',
        phone: '',
        postalCode: '',
        deliveryInstruction: '',
        isDefaultShipping: false,
        isDefaultBilling: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchAddress = async () => {
            if (!id) return;
            try {
                // We need a getAddressById API or filter from getAddresses.
                // Assuming getAddresses includes ID for now or checking if getAddress exists in API.
                // userApi.getAddress(id) usually exists. Let's verify or use getAll and find.
                // Looking at user.ts, there is no getAddress(id), but there is getAllAddresses. 
                // Better to implement getAddress(id) in user.ts or find locally if we had store. 
                // Wait, backend has getAddress controller! But user.ts helper might not.
                // Let's check API file again. Ah, viewed_files says getAddresses only.
                // I'll add getAddress to userApi below or use direct axios if needed, but adding to API is cleaner.
                // For now, let's fetch all and find. 
                const addresses = await userApi.getAddresses();
                const address = addresses.find((a: any) => a._id === id);

                if (address) {
                    setFormData({
                        firstName: address.firstName,
                        lastName: address.lastName,
                        country: address.country,
                        company: '', // company not in strict Address interface shown?
                        streetAddress: address.address1 || '',
                        apt: address.address2 || '',
                        city: address.city,
                        state: address.state,
                        phone: address.phoneNumber || '',
                        postalCode: address.postalCode || '',
                        deliveryInstruction: '',
                        isDefaultShipping: address.isDefault || false,
                        isDefaultBilling: false,
                    });
                } else {
                    router.push('/account');
                }
            } catch (error) {
                console.error('Failed to fetch address', error);
                router.push('/account');
            } finally {
                setIsFetching(false);
            }
        };
        fetchAddress();
    }, [id, router]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await userApi.updateAddress(id as string, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                country: formData.country,
                address1: formData.streetAddress,
                address2: formData.apt,
                city: formData.city,
                state: formData.state,
                postalCode: formData.postalCode,
                phoneNumber: formData.phone,
                isDefault: formData.isDefaultShipping,
                type: 'shipping'
            });
            router.push('/account');
        } catch (error) {
            console.error('Failed to update address', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/account');
    };

    if (isFetching) {
        return <div className="flex justify-center items-center py-20"><Loader2 className="animate-spin" /></div>;
    }

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
                <span className="text-[#3C4242]">Edit Address</span>
            </nav>

            {/* Title */}
            <h1 className="text-[#3C4242] text-2xl font-semibold mb-2">My Info</h1>
            <h2 className="text-[#3C4242] text-xl mb-8">Edit Address</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <label className="block text-[#3C4242] text-base mb-2 tracking-wide">First Name*</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30" />
                    </div>
                    <div>
                        <label className="block text-[#3C4242] text-base mb-2 tracking-wide">Last Name*</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30" />
                    </div>
                </div>

                {/* Row 2: Country */}
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <label className="block text-[#3C4242] text-base mb-2 tracking-wide">Country / Region*</label>
                        <div className="relative">
                            <select name="country" value={formData.country} onChange={handleChange} required className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30 appearance-none cursor-pointer">
                                <option value="">Select Country</option>
                                <option value="Egypt">Egypt</option>
                                <option value="Iraq">Iraq</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3C4242] pointer-events-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[#3C4242] text-base mb-2 tracking-wide">Company Name</label>
                        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company (optional)" className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30" />
                    </div>
                </div>

                {/* Row 3: Address */}
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <label className="block text-[#3C4242] text-base mb-2 tracking-wide">Street Address*</label>
                        <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} placeholder="House number and street name" required className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30" />
                    </div>
                    <div>
                        <label className="block text-[#3C4242] text-base mb-2 tracking-wide">Apt, suite, unit</label>
                        <input type="text" name="apt" value={formData.apt} onChange={handleChange} placeholder="apartment, suite, unit, etc. (optional)" className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30" />
                    </div>
                </div>

                {/* Row 4: City & State */}
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <label className="block text-[#3C4242] text-base mb-2 tracking-wide">City*</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Town / City" required className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30" />
                    </div>
                    <div>
                        <label className="block text-[#3C4242] text-base mb-2 tracking-wide">State / Governorate*</label>
                        <div className="relative">
                            <select name="state" value={formData.state} onChange={handleChange} required className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30 appearance-none cursor-pointer">
                                <option value="">Select State</option>
                                {formData.country === 'Egypt' && (
                                    <>
                                        <option value="Cairo">Cairo</option>
                                        <option value="Giza">Giza</option>
                                        <option value="Alexandria">Alexandria</option>
                                        <option value="Dakahlia">Dakahlia</option>
                                        <option value="Red Sea">Red Sea</option>
                                        <option value="Beheira">Beheira</option>
                                        <option value="Fayoum">Fayoum</option>
                                        <option value="Gharbiya">Gharbiya</option>
                                        <option value="Ismailia">Ismailia</option>
                                        <option value="Menofia">Menofia</option>
                                        <option value="Minya">Minya</option>
                                        <option value="Qaliubiya">Qaliubiya</option>
                                        <option value="New Valley">New Valley</option>
                                        <option value="Suez">Suez</option>
                                        <option value="Aswan">Aswan</option>
                                        <option value="Assiut">Assiut</option>
                                        <option value="Beni Suef">Beni Suef</option>
                                        <option value="Port Said">Port Said</option>
                                        <option value="Damietta">Damietta</option>
                                        <option value="Sharkia">Sharkia</option>
                                        <option value="South Sinai">South Sinai</option>
                                        <option value="Kafr Al Sheikh">Kafr Al Sheikh</option>
                                        <option value="Matrouh">Matrouh</option>
                                        <option value="Luxor">Luxor</option>
                                        <option value="Qena">Qena</option>
                                        <option value="North Sinai">North Sinai</option>
                                        <option value="Sohag">Sohag</option>
                                    </>
                                )}
                                {formData.country === 'Iraq' && (
                                    <>
                                        <option value="Baghdad">Baghdad</option>
                                        <option value="Basra">Basra</option>
                                        <option value="Nineveh">Nineveh</option>
                                        <option value="Erbil">Erbil</option>
                                        <option value="Kirkuk">Kirkuk</option>
                                        <option value="Sulaymaniyah">Sulaymaniyah</option>
                                        <option value="Anbar">Anbar</option>
                                        <option value="Babil">Babil</option>
                                        <option value="Dhi Qar">Dhi Qar</option>
                                        <option value="Diyala">Diyala</option>
                                        <option value="Duhok">Duhok</option>
                                        <option value="Karbala">Karbala</option>
                                        <option value="Maysan">Maysan</option>
                                        <option value="Muthanna">Muthanna</option>
                                        <option value="Najaf">Najaf</option>
                                        <option value="Saladin">Saladin</option>
                                        <option value="Wasit">Wasit</option>
                                    </>
                                )}
                                {!formData.country && <option disabled>Select Country First</option>}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3C4242] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Row 5: Phone & Postal Code */}
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <label className="block text-[#3C4242] text-base mb-2 tracking-wide">Phone*</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30" />
                    </div>
                    <div>
                        <label className="block text-[#3C4242] text-base mb-2 tracking-wide">Postal Code*</label>
                        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code" required className="w-full px-5 py-4 bg-[#F6F6F6] rounded-lg text-[#3C4242] placeholder:text-[#807D7E] focus:outline-none focus:ring-2 focus:ring-[#8A33FD]/30" />
                    </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" name="isDefaultShipping" checked={formData.isDefaultShipping} onChange={handleChange} className="w-5 h-5 border-2 border-[#BEBCBD] rounded-sm accent-[#8A33FD] cursor-pointer" />
                        <span className="text-[#3C4242] text-lg">Set as default shipping address</span>
                    </label>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 pt-4">
                    <button type="submit" disabled={isLoading} className="px-10 py-3 bg-[#8A33FD] text-white text-lg rounded-lg hover:bg-[#7229D6] transition-colors disabled:opacity-50 flex items-center gap-2">
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        Save Changes
                    </button>
                    <button type="button" onClick={handleCancel} className="px-10 py-3 bg-[#F6F6F6] text-[#807D7E] text-lg rounded-lg hover:bg-[#E8E8E8] transition-colors">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
