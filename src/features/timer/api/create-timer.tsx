// features/timer/api/create-timer.tsx

// Libs
import { supabase } from "@/lib/supabase/supabase-client";
// Types
import type { TimerTable } from "@/types/database.types";
import type { SetNonNullable } from "type-fest";
type NewTimer = SetNonNullable<TimerTable>;
export const createTimer = async (newTimerData: NewTimer) => {
	try {
		const { data, error } = await supabase
			.from("timer")
			.upsert(newTimerData, { onConflict: newTimerData.user_id })
			.select();
		if (data) {
			console.log("Timer created:", data);
			return data;
		}
		if (error) {
			throw new Error(`Could not create timer: ${error.message}`);
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Could not create timer: ${error.message}`);
		}
	}
};
