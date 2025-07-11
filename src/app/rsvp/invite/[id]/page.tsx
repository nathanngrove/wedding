"use client";

import React, { useEffect, useState } from "react";
import RsvpForm from "@/components/RsvpForm";
import { usePathname, useRouter } from "next/navigation";

export type InviteType = {
	id: number;
	familyName: string;
	guestCount: number;
	attendingCount: number;
	kidCount: number;
	kidsAttendingCount: number;
	vegetarianCount: number;
	dietaryRestrictions: string;
	persons: Array<object>;
	attendingNames: Array<string>;
};

function Page() {
	const pathname = usePathname();
	const splitPathname = pathname.split("/");
	const id = splitPathname[splitPathname.length - 1];

	const router = useRouter();

	const [data, setData] = useState<InviteType>();
	const [loading, setLoading] = useState<boolean>();

	useEffect(() => {
		// Define an async function to fetch the data
		async function fetchData() {
			try {
				const res = await fetch(
					`https://rsvp-api-management.azure-api.net/api/Invite/${id}`,
					{
						method: "GET",
						headers: {
							"Ocp-Apim-Subscription-Key":
								process.env.NEXT_PUBLIC_AZURE_OCP!,
						},
					}
				);
				if (!res.ok) {
					throw new Error("Network response was not ok");
				}

				const fetchedData: InviteType = await res.json();

				if (
					localStorage.getItem("invite") == null ||
					localStorage.getItem("invite") !== fetchedData.id.toString()
				) {
					router.push("/rsvp");
				}

				setTimeout(() => setData(fetchedData), 1000); // Update state with the fetched data
			} catch (error) {
				console.error("Error fetching data:", error); // Handle any errors
			} finally {
				setLoading(false); // Set loading to false after fetch completes
			}
		}

		fetchData();
	}, [id]);

	useEffect(() => {}, []);

	return (
		<main className="min-h-screen min-w-screen bg-creme p-4">
			<div className="mx-auto max-w-[90vw] flex flex-col gap-4">
				<a href="/rsvp" className="text-lg font-semibold underline">
					&lt; Back to home
				</a>
				<div className="flex flex-col gap-8">
					<div>{loading ? "Loading..." : null}</div>
					<div>{data ? <RsvpForm invite={data} /> : null}</div>
				</div>
			</div>
		</main>
	);
}

export default Page;
