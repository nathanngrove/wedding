"use client";

import Countdown from "@/components/Countdown";
import FaqAccordion from "@/components/FaqAccordion";
import SubHeading from "@/components/SubHeading";
import { Parisienne } from "next/font/google";
import Image from "next/image";

const parisienne = Parisienne({
	weight: "400",
	preload: true,
	subsets: ["latin"],
});

export default function Home() {
	return (
		<>
			<section className="flex flex-col gap-12 bg-creme overflow-x-hidden">
				<Image
					src="leaves.png"
					alt="leaves"
					width={350}
					height={233}
					className="mx-auto mt-[-1rem]"
				/>
				<div className="mx-auto text-center flex flex-col gap-8">
					<h1
						className={`md:text-6xl text-4xl text-darkemerald ${parisienne.className}`}>
						Nathan and Bridget
					</h1>
					<div>
						<SubHeading
							text="Join us on"
							className="lg:text-3xl text-2xl text-darkemerald"
						/>
						<SubHeading
							text="September 20, 2025"
							className="lg:text-3xl text-2xl text-darkemerald font-bold"
						/>
						<SubHeading
							text={`as we say "I do"`}
							className="lg:text-3xl text-2xl text-darkemerald"
						/>
					</div>
					<div>
						<SubHeading
							text={`Please RSVP by August 10th`}
							className="lg:text-3xl text-2xl text-darkemerald pb-4"
						/>
						<a
							href="https://wedding-lemon-nu.vercel.app/rsvp"
							className="bg-darkemerald text-white w-full rounded-md text-2xl py-2 px-4">
							RSVP Here
						</a>
					</div>
				</div>
				<Image
					src="white-rose.png"
					alt="white rose"
					width={300}
					height={232}
					className="translate-x-[35vw] md:translate-x-[50vw] lg:translate-x-[65vw]"
				/>
			</section>
			<section className="bg-creme p-8">
				<div className="max-w-screen-lg mx-auto flex flex-col gap-8">
					<div>
						<SubHeading
							text="FAQ"
							className={`text-darkemerald text-left max-w-screen-lg mx-auto mb-8 ${parisienne.className}`}
						/>
						<FaqAccordion
							summary={"Is there a dress code?"}
							details={
								"Cocktail attire, but feel free to be flexible and express your personal style."
							}
						/>
						<FaqAccordion
							summary={"Can I bring a date or guest?"}
							details={
								"You can bring a date or guest only if specifically indicated on your invitation."
							}
						/>
						<FaqAccordion
							summary={"What kind of food will be served?"}
							details={"We are serving Italian cuisine."}
						/>
						<FaqAccordion
							summary={
								"Are there accommodations for out of town guests?"
							}
							details={
								"Guests will need to arrange their own accommodations."
							}
						/>
						<FaqAccordion
							summary={"Are children welcome at the wedding?"}
							details={
								"If your children are invited, you'll have extra spots listed when you RSVP. If you are not sure, please reach out at (909) 600-3163."
							}
						/>
						<FaqAccordion
							summary={"Parking at the venue and the reception?"}
							details={"Free parking at both locations."}
						/>
					</div>
				</div>
			</section>
			<section className="bg-darkemerald p-8">
				<div className="max-w-screen-lg mx-auto flex flex-col gap-8 md:flex-row md:justify-between items-center">
					<div>
						<SubHeading
							text="How it all started"
							className={`text-white text-left max-w-screen-lg mx-auto mb-8 ${parisienne.className}`}
						/>
						<p className="text-white max-w-[60ch] text-md leading-10 font-serif">
							We met at our first job at a pizza place—bonding
							over late-night shifts, endless orders, and the
							occasional kitchen chaos. Somewhere between dealing
							with hangry customers and making way too many
							breadsticks, we found something even better than a
							paycheck. <br />
							<br />
							Now, we are finally making it official!
						</p>
					</div>
					<Image
						src="us.jpg"
						alt="Us <3"
						className="overflow-hidden block rounded-[50%] border-2 border-white outline outline-2 outline-white outline-offset-8"
						width={300}
						height={300}
					/>
				</div>
			</section>
			<section className={`py-16 px-8 bg-darkemerald relative`}>
				<Image
					src="floral-dark.jpg"
					alt="Floral"
					fill
					className="left-0 right-0 top-0 bottom-0 absolute object-cover"
				/>
				<div className="relative z-10">
					<SubHeading
						text="Let the countdown begin!"
						className={`pb-12 text-white text-center mx-auto w-fit ${parisienne.className}`}
					/>
					<Countdown />
				</div>
			</section>
		</>
	);
}
