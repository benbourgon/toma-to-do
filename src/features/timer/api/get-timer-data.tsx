// features/timer/api/get-timer-data.tsx

// Libraries
import { supabase } from "@/lib/supabase/supabaseClient";

// Types
import type { Timer } from "@/types/database.types";

export const getTimerData = async (userId: Timer["user_id"]) => {
  try {
    const { data, error } = await supabase
      .from("timer")
      .select()
      .eq("user_id", userId);
    if (error) throw new Error(`Could not get timer data: ${error.message}`);
    if (data) {
      console.log("Timer data:", data);
      return data;
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Could not get timer data: ${error.message}`);
    }
  }
};
