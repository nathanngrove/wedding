import z from "zod";

export const validName = z
	.string()
	.trim()
	.max(20)
	.min(1)
	.regex(/[A-Za-z]/);
