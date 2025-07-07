"use client";

import FromInput from "@/components/FromInput";
import { validName } from "@/utlis/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RSVP() {
	const router = useRouter();

	const [error, setError] = useState<string | null>(null);

	async function getInviteIdByName(formData: FormData) {
		const firstName = formData.get("first-name");
		const lastName = formData.get("last-name");

		const validFirstName = validName.safeParse(firstName);
		if (!validFirstName.success) setError(validFirstName.error.toString());
		const validLastName = validName.safeParse(lastName);
		if (!validLastName.success) setError(validLastName.error.toString());

		try {
			const nameInUrl =
				validFirstName.data!.toLowerCase() +
				"%20" +
				validLastName.data!.toLowerCase();
			const res = await fetch(
				`https://rsvp-api-management.azure-api.net/api/Invite/byname/${nameInUrl}`,
				{
					method: "GET",
					headers: {
						"Ocp-Apim-Subscription-Key":
							process.env.NEXT_PUBLIC_AZURE_OCP!,
					},
				}
			);

			if (res.status !== 200) {
				throw new Error("Please enter a valid first and last name.");
			}

			if (res.ok) {
				const invite = await res.json();
				router.push(`/rsvp/invite/${invite.id}`);
			}
		} catch (e) {
			setError("Please enter a valid first and last name.");
		}
	}

	return (
		<main className="min-h-dvh min-w-screen bg-creme pt-32">
			<div className="mx-auto max-w-[90%] row-start-2">
				<div className="bg-white rounded-lg p-4 pb-6">
					<h1 className="text-4xl font-bold">RSVP</h1>
					<p className="text-lg font-semibold">
						Please enter the naem from RSVP password card to begin.
					</p>
					<form className="grid gap-4" action={getInviteIdByName}>
						<FromInput name="first-name" label="First Name" />
						<FromInput name="last-name" label="Last Name" />
						{error ? (
							<p className="text-red-500 font-bold">
								{error.toString()}
							</p>
						) : null}
						<button
							type="submit"
							className="bg-darkemerald text-white w-full rounded-md text-3xl py-2">
							Submit
						</button>
					</form>
				</div>
			</div>
		</main>
	);
}
