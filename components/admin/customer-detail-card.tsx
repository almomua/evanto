'use client';

import React from 'react';

export function CustomerDetailCard() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Profile Info */}
                <div className="flex items-center gap-4 lg:w-1/3 border-r lg:border-gray-100 pr-8">
                    <div className="w-20 h-20 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] font-bold text-2xl">
                        RF
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[#3C4242]">Robert Fox</h2>
                        <p className="text-sm text-gray-400">robert@gmail.com</p>
                    </div>
                </div>

                {/* Personal Details */}
                <div className="lg:w-1/3 space-y-4 border-r lg:border-gray-100 pr-8">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Personal Information</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Contact Number</span>
                            <span className="text-[#3C4242] font-semibold">(201) 555-0124</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Gender</span>
                            <span className="text-[#3C4242] font-semibold">Male</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Date of Birth</span>
                            <span className="text-[#3C4242] font-semibold">1 Jan, 1985</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Member Since</span>
                            <span className="text-[#3C4242] font-semibold">3 March, 2023</span>
                        </div>
                    </div>
                </div>

                {/* Shipping & Stats */}
                <div className="lg:w-1/3 space-y-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Shipping Address</h3>
                    <p className="text-sm text-[#3C4242] font-medium leading-relaxed">
                        3517 W. Gray St. Utica, Pennsylvania 57867
                    </p>

                    <div className="flex justify-between pt-4 gap-4">
                        <div className="text-center">
                            <p className="text-xl font-bold text-[#3C4242]">150</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Total Order</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-[#3C4242]">140</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Completed</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-[#3C4242]">10</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Canceled</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
