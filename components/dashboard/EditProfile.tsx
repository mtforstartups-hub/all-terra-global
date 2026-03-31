"use client";
import React, { useState } from "react";

export default function EditProfile({ onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@allteraglobal.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Premium Investor with 5+ years of experience in real estate and tech equities.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  return (
    <div className="max-w-[800px] mx-auto p-8 border border-black/5 bg-white/90 backdrop-blur-md shadow-[0_4px_16px_0_rgba(0,0,0,0.05)] rounded-2xl animate-fade-in">
      <div className="mb-6 pb-4 border-b border-black/10">
        <h2 className="text-2xl text-secondary font-bold mb-2">Edit Profile</h2>
        <p className="text-sm text-slate-500">Update your personal information and contact details.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[13px] font-medium text-slate-500 uppercase tracking-[0.5px]">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="px-4 py-3 bg-black/5 border border-black/10 rounded-lg text-secondary text-[15px] transition-all duration-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-slate-500/10"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[13px] font-medium text-slate-500 uppercase tracking-[0.5px]">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="px-4 py-3 bg-black/5 border border-black/10 rounded-lg text-secondary text-[15px] transition-all duration-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-slate-500/10"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-medium text-slate-500 uppercase tracking-[0.5px]">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-3 bg-black/5 border border-black/10 rounded-lg text-secondary text-[15px] transition-all duration-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-slate-500/10"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[13px] font-medium text-slate-500 uppercase tracking-[0.5px]">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="px-4 py-3 bg-black/5 border border-black/10 rounded-lg text-secondary text-[15px] transition-all duration-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-slate-500/10"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-[13px] font-medium text-slate-500 uppercase tracking-[0.5px]">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="px-4 py-3 bg-black/5 border border-black/10 rounded-lg text-secondary text-[15px] transition-all duration-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-slate-500/10"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-medium text-slate-500 uppercase tracking-[0.5px]">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="px-4 py-3 bg-black/5 border border-black/10 rounded-lg text-secondary text-[15px] transition-all duration-200 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-slate-500/10 resize-y"
          ></textarea>
        </div>

        <div className="flex justify-end gap-4 mt-3 pt-6 border-t border-black/10">
          <button
            type="button"
            className="px-6 py-3 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 bg-transparent border border-black/10 text-secondary hover:bg-slate-500/10"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 bg-accent border border-accent text-white hover:bg-[#e09915] hover:-translate-y-px"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
