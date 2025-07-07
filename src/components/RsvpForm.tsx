"use client";

import { InviteType } from "@/app/rsvp/invite/[id]/page";
import React, { useRef, useState } from "react";
import FormSelectInput from "./FormSelectInput";
import { validName } from "@/utlis/utils";
import { useRouter } from "next/navigation";

type RsvpFormProps = {
	invite: InviteType;
};

function RsvpForm({ invite }: RsvpFormProps) {
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const [vegetarianCount, setVegetarianCount] = useState<number>(
		invite.vegetarianCount === null ? 0 : invite.vegetarianCount
	);
	const [attendingCount, setAttendingCount] = useState<number>(
		invite.attendingCount === null ? 0 : invite.attendingCount
	);
	const [kidsAttendingCount, setKidsAttendingCount] = useState<number>(
		invite.kidsAttendingCount === null ? 0 : invite.kidsAttendingCount
	);
	const [dietaryRestrictions, setDietaryRestrictions] = useState<string>(
		invite.dietaryRestrictions === null ? "" : invite.dietaryRestrictions
	);

	const names = useRef<HTMLInputElement[]>([]);

	async function submitForm() {
		const namesArray: Array<string> = [];
		names.current.map((name) => namesArray.push(name.value));

		namesArray.forEach((name) => {
			const validatedName = validName.safeParse(name);
			if (!validatedName.success)
				setError(validatedName.error.toString());
		});

		const formData = {
			FamilyName: invite.familyName,
			GuestCount: invite.guestCount,
			AttendingCount: attendingCount,
			KidsAttendingCount: kidsAttendingCount,
			VegetarianCount: vegetarianCount,
			DietaryRestrictions: dietaryRestrictions,
			AttendingNames: namesArray,
		};

		try {
			const res = await fetch(
				`https://rsvp-api-management.azure-api.net/api/Invite/${invite.id}`,
				{
					method: "PUT",
					headers: {
						"Ocp-Apim-Subscription-Key":
							process.env.NEXT_PUBLIC_AZURE_OCP!,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			if (res.status !== 200) {
				throw new Error("Please make sure all inputs are valid.");
			}

			if (res.ok) {
				await res.json();
				router.push(`/`);
			}
		} catch (e) {
			setError("Please make sure all inputs are valid.");
		}
	}

	return (
		<div className="mx-auto bg-white rounded-lg p-4">
			<h1 className="text-2xl font-bold">{invite.familyName}</h1>
			<form className="grid gap-4" action={submitForm}>
				<FormSelectInput
					name="attending"
					options={invite.guestCount + 1}
					selected={attendingCount}
					setSelected={setAttendingCount}
					label="How many of your reserved seats will be attending?"
				/>
				{attendingCount === 0 ? null : (
					<>
						<label>
							Please list the first names of those attending
							below:
						</label>
						{Array(attendingCount)
							.fill(0)
							.map((_, i) =>
								i >= attendingCount ? null : (
									<input
										key={i}
										ref={(element) => {
											if (element) {
												element.value =
													invite.attendingNames ==
													null
														? " "
														: invite.attendingNames[
																i
														  ];
												names.current[i] = element;
											} else {
												// Optional: handle element removal if items can be removed
												delete names.current[i];
											}
										}}
										type="text"
										className="text-xl py-2 px-4 w-full border-black border-[1px] rounded-lg"
										required
									/>
								)
							)}
						{invite.kidCount === 0 ? (
							<FormSelectInput
								label="Of these seats, how many are children?"
								name="kids"
								options={invite.kidCount + 1}
								selected={kidsAttendingCount}
								setSelected={setKidsAttendingCount}
								disabled={true}
							/>
						) : (
							<FormSelectInput
								label="Of these seats, how many are children?"
								name="kids"
								options={invite.kidCount + 1}
								setSelected={setKidsAttendingCount}
								selected={kidsAttendingCount}
							/>
						)}
						<FormSelectInput
							label="How many vegetarian meals are needed (if any)?"
							name="veggie"
							options={attendingCount + 1}
							selected={vegetarianCount}
							setSelected={setVegetarianCount}
						/>
						<label htmlFor="dietary-restrictions">
							Does anyone in your party have food allergies we
							should be aware of?{" "}
							<span className="italic">(optional)</span>
						</label>
						<textarea
							name="dietary-restrictions"
							value={dietaryRestrictions}
							onChange={(e) =>
								setDietaryRestrictions(e.target.value)
							}
							className="w-full text-xl border-black border-[1px] rounded-lg"
						/>
					</>
				)}
				{error ? (
					<p className="text-red-500 font-bold">{error.toString()}</p>
				) : null}
				<button
					type="submit"
					className="bg-darkemerald text-white w-full rounded-md text-3xl py-2">
					Submit
				</button>
			</form>
		</div>
	);
}

export default RsvpForm;
