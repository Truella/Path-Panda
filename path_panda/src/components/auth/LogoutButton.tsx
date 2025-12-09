'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error logging out:', error);
      // Optionally, show an error message to the user
      alert('Error logging out. Please try again.');
    } else {
      // Redirect to the login page after successful logout
      router.push('/get-started');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-[#7a5e46] text-white font-semibold rounded-lg hover:bg-[#6b513b] transition-all duration-300 shadow-md"
    >
      Log Out
    </button>
  );
}
