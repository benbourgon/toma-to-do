// features/timer/components/Timer.tsx

// Libraries

// Types
import type { TimerTable } from "@/types/database.types";
export const Timer = (props: TimerTable) => {
	const { seconds_left } = props;
	if (typeof seconds_left !== "number") throw new Error("Invalid seconds_left");
	const minutesLeft = Math.floor(seconds_left / 60);
	const secondsRemainder = seconds_left % 60;
	return (
		<h3>
			{minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:
			{secondsRemainder < 10 ? `0${secondsRemainder}` : secondsRemainder}
		</h3>
	);
};
