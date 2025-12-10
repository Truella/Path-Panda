'use client';

import { supabase } from '../../db/supabaseClient';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out. Please try again.');
    } else {
      toast.success('Logged out successfully!');
      router.push('/get-started');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-gray-600 hover:text-[#d4a574] transition font-medium text-sm cursor-pointer"
    >
      <LogOut className="w-4 h-4" />
      Log Out
    </button>
  );
}
