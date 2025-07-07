import React, { useEffect, useState } from "react";
import RsvpForm from "@/components/RsvpForm";

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

export function generateStaticParams() {
	const params: Array<{ id: number }> = [];

	for (let i = 0; i < 55; i++) {
		params.push({ id: i });
	}
	return params;
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

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
				console.log(fetchedData);
				setData(fetchedData); // Update state with the fetched data
			} catch (error) {
				console.error("Error fetching data:", error); // Handle any errors
			} finally {
				setLoading(false); // Set loading to false after fetch completes
			}
		}

		fetchData();
	}, [id]);

	if (loading) return <div>Loading...</div>;

	return (
		<main className="min-h-screen min-w-screen bg-creme p-4">
			<div className="mx-auto max-w-[90vw] flex flex-col gap-4">
				<a href="/rsvp" className="text-lg font-semibold underline">
					&lt; Back to home
				</a>
				<div className="flex flex-col gap-8">
					<div>{data ? <RsvpForm invite={data} /> : null}</div>
				</div>
			</div>
		</main>
	);
}

export default Page;
