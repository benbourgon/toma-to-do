// features/timer/types/index.tsx

/* Credit to Stack Overflow for the Enumerate and IntRange types
https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range */

type Enumerate<
	N extends number,
	Acc extends number[] = [],
> = Acc["length"] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
	Enumerate<T>,
	Enumerate<F>
>;

export type Minute = IntRange<0, 60>;
export type Second = IntRange<0, 60>;
