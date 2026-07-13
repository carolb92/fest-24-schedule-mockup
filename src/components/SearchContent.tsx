import React, { useState } from "react";
import schedule from "@/data/events.json";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ScheduleCard from "@/components/ScheduleCard";
import { festDays, addresses } from "@/lib/constants";
import { type EventInfo } from "@/types";

// NOTE: did not include debouncing, loading states, or error handling as we are just filtering static data here
export default function SearchContent() {
	const [searchTerm, setSearchTerm] = useState("");
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchTerm(e.target.value.toLowerCase());
		console.log(e.target.value);
	}

	// THIS DOES NOT COVER EDGE CASES WHERE PERFORMER IS UNDEFINED BUT MEMO IS THE PERFORMER NAME
	// example:
	// {
	// 	"day": 2,
	// 	"event_id": "40962",
	// 	"memo": "Jim Saah",
	// 	"start_time": 1761408000,
	// 	"end_time": 1761411600,
	// 	"start_string": "12:00 PM",
	// 	"end_string": "1:00 PM",
	// 	"venue_id": 40960,
	// 	"venue_name": "The Lynx"
	// }
	const searchResults: EventInfo[] = schedule
		.sort((a, b) => (a.performer ?? "").localeCompare(b.performer ?? ""))
		.filter((event) =>
			event.performer?.toLowerCase().includes(searchTerm.trim()),
		);
	console.log("search results: ", searchResults);

	return (
		<div className="flex flex-col gap-y-2 justify-center items-center">
			<Field className="md:w-sm">
				<FieldLabel
					htmlFor="search-input"
					className="text-teal-600 mt-4 mb-1 uppercase font-headline font-semibold"
				>
					Search for a performer
				</FieldLabel>
				<Input
					id="search-input"
					type="text"
					placeholder="Start typing to search"
					value={searchTerm}
					onChange={(e) => handleChange(e)}
					className="text-white"
				/>
			</Field>
			<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
				{searchResults.map((result) => {
					const day = festDays[result.day];
					const venueAddress = addresses[result.venue_name];

					return (
						<ScheduleCard
							title={result.performer}
							titleLink={result.performer_url ?? ""}
							memoSubtitle={
								result.memo !== "OUTSIDE" && result.memo !== "INSIDE"
									? result.memo
									: ""
							}
						>
							<div className="flex flex-col gap-y-1 items-center justify-center">
								<span className="font-headline uppercase text-lg font-bold">
									{day}
								</span>
								<div className="grid grid-cols-2 gap-12">
									{/* flex gap-x-3 w-full justify-around */}
									<span className="">
										{/* w-[60%] */}
										<a
											href={venueAddress}
											target="_blank"
											rel="noopener noreferrer"
											className="font-bold underline"
										>
											{result.venue_name}
										</a>{" "}
										<span className="grow">
											{result.memo === "OUTSIDE" || result.memo === "INSIDE"
												? `(${result.memo})`
												: ""}
										</span>
									</span>
									<span className="italic font-light">{`${result.start_string} - ${result.end_string}`}</span>
								</div>
							</div>
						</ScheduleCard>
					);
				})}
			</div>
		</div>
	);
}
