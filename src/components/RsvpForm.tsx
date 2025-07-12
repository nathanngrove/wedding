"use client";

import { CombinedResponses } from "@/app/rsvp/invite/[id]/page";
import React, { useState } from "react";
import FormSelectInput from "./FormSelectInput";
import { validName } from "@/utlis/utils";

type RsvpFormProps = {
	invite: CombinedResponses;
};

function RsvpForm({ invite }: RsvpFormProps) {
	const [isComing, setIsComing] = useState<number>(
		invite.isComing == undefined ? 0 : invite.isComing == true ? 1 : 0
	);
	const [vegetarianCount, setVegetarianCount] = useState<number>(
		invite.vegetarianCount == null ? 0 : invite.vegetarianCount
	);
	const [attendingCount, setAttendingCount] = useState<number>(
		invite.attendingCount == null ? 0 : invite.attendingCount
	);
	const [kidsAttendingCount, setKidsAttendingCount] = useState<number>(
		invite.kidsAttendingCount == null ? 0 : invite.kidsAttendingCount
	);
	const [dietaryRestrictions, setDietaryRestrictions] = useState<string>(
		invite.dietaryRestrictions == null ? "" : invite.dietaryRestrictions
	);
	const [name, setName] = useState<Array<string>>(
		invite.attendingNames == null
			? Array(invite.guestCount).fill("")
			: invite.attendingNames
	);

	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	async function submitForm() {
		name.forEach((n) => {
			const validatedName = validName.safeParse(n);
			if (!validatedName.success)
				setError(validatedName.error.toString());
		});

		const inviteUpdateData = {
			FamilyName: invite.familyName,
			GuestCount: invite.guestCount,
			AttendingCount: attendingCount,
			KidCount: invite.kidCount,
			KidsAttendingCount: kidsAttendingCount,
			VegetarianCount: vegetarianCount,
			DietaryRestrictions: dietaryRestrictions,
			AttendingNames: name,
		};

		const inviteResponseUpdateData = {
			InviteId: invite.id,
			IsComing: isComing == 0 ? false : true,
		};

		try {
			const res = await Promise.all([
				isComing == 0
					? null
					: fetch(
							`https://rsvp-api-management.azure-api.net/api/Invite/${invite.id}`,
							{
								method: "PUT",
								headers: {
									"Ocp-Apim-Subscription-Key":
										process.env.NEXT_PUBLIC_AZURE_OCP!,
									"Content-Type": "application/json",
								},
								body: JSON.stringify(inviteUpdateData),
							}
					  ),
				fetch(
					invite.isComing == undefined
						? "https://rsvp-api-management.azure-api.net/api/InviteResponse"
						: `https://rsvp-api-management.azure-api.net/api/InviteResponse/${invite.inviteResponseId}`,
					{
						method: invite.isComing == undefined ? "POST" : "PUT",
						headers: {
							"Ocp-Apim-Subscription-Key":
								process.env.NEXT_PUBLIC_AZURE_OCP!,
							"Content-Type": "application/json",
						},
						body: JSON.stringify(inviteResponseUpdateData),
					}
				),
			]);

			if (res[0]?.ok && res[1].ok) {
				setSuccess(
					"Your RSVP has been successfully submitted. Thank you!"
				);
			}
		} catch (e) {
			setError("Something went wrong.");
		}
	}

	return (
		<div className="mx-auto bg-white rounded-lg p-4">
			<h1 className="text-2xl font-bold">{invite.familyName}</h1>
			<form className="grid gap-4" action={submitForm}>
				<FormSelectInput
					label="Are you coming?"
					name="coming"
					options={["Yes", "No"]}
					selected={isComing}
					setSelected={setIsComing}
				/>
				{isComing == 0 ? null : (
					<>
						<FormSelectInput
							name="attending"
							options={invite.guestCount}
							selected={attendingCount}
							setSelected={setAttendingCount}
							label="How many of your reserved seats will be attending?"
						/>
						<label>
							Please list the full names of those attending below:
						</label>
						{name.map((n, i) => (
							<input
								key={i}
								value={n}
								onChange={(e) =>
									setName((prevName) => {
										const copy = [...prevName];
										copy[i] = e.target.value
											? e.target.value
											: "";
										return copy;
									})
								}
								type="text"
								className="text-xl py-2 px-4 w-full border-black border-[1px] rounded-lg"
								required
							/>
						))}
						{invite.kidCount === 0 ? (
							<FormSelectInput
								label="Of these seats, how many are children?"
								name="kids"
								options={invite.kidCount}
								selected={0}
								disabled={true}
							/>
						) : (
							<FormSelectInput
								label="Of these seats, how many are children?"
								name="kids"
								options={invite.kidCount}
								setSelected={setKidsAttendingCount}
								selected={kidsAttendingCount}
							/>
						)}
						<FormSelectInput
							label="How many vegetarian meals are needed (if any)?"
							name="veggie"
							options={attendingCount}
							selected={vegetarianCount}
							setSelected={setVegetarianCount}
							startAtZero={true}
						/>
						<label htmlFor="dietary-restrictions">
							Does anyone in your party have food allergies we
							should be aware of?{" "}
							<span className="italic">(optional)</span>
						</label>
						<textarea
							name="dietary-restrictions"
							value={dietaryRestrictions}
							onChange={(e) => {
								setDietaryRestrictions(e.target.value);
							}}
							className="w-full text-xl border-black border-[1px] rounded-lg"
						/>
					</>
				)}
				{error ? (
					<p className="text-red-500 font-bold">{error.toString()}</p>
				) : null}
				{success ? (
					<p className="text-green-500 font-bold">{success}</p>
				) : (
					<button
						type="submit"
						className="bg-darkemerald text-white w-full rounded-md text-3xl py-2">
						Submit
					</button>
				)}
			</form>
		</div>
	);
}

export default RsvpForm;
