import { useState } from "react";
import schedule from "@/data/events.json";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ScheduleCard from "@/components/ScheduleCard";
import { festDays, addresses } from "@/lib/constants";
import { type EventInfo } from "@/types";

//* NOTE: did not include debouncing, loading states, or error handling as we are just filtering static data here
export default function SearchContent() {
	const [searchTerm, setSearchTerm] = useState("");

	//* THIS DOES NOT COVER EDGE CASES WHERE PERFORMER IS UNDEFINED BUT MEMO IS THE PERFORMER NAME
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
	const searchResults: EventInfo[] = [...schedule]
		.sort((a, b) => (a.performer ?? "").localeCompare(b.performer ?? ""))
		.filter((event) =>
			event.performer?.toLowerCase().includes(searchTerm.trim().toLowerCase()),
		);

	// group by performer, then by day number => that performer's events for the day
	const performerGroups = new Map<
		string,
		{
			performerId: string;
			performerName: string;
			performerUrl?: string;
			eventsByDay: Map<number, EventInfo[]>;
		}
	>();
	for (const result of searchResults) {
		const performerId = result.performer_id ?? result.performer ?? "";
		if (!performerGroups.has(performerId)) {
			performerGroups.set(performerId, {
				performerId,
				performerName: result.performer ?? "",
				performerUrl: result.performer_url,
				eventsByDay: new Map<number, EventInfo[]>(),
			});
		}

		const group = performerGroups.get(performerId)!;
		const dayEvents = group.eventsByDay.get(result.day) ?? [];
		dayEvents.push(result);
		group.eventsByDay.set(result.day, dayEvents);
	}

	return (
		<div className="flex flex-col gap-y-2 justify-center items-center">
			<Field className="md:w-sm mb-3">
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
					onChange={(e) => setSearchTerm(e.target.value)}
					className="text-white"
				/>
			</Field>
			<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
				{Array.from(performerGroups.values()).map((performer) => (
					<ScheduleCard
						key={performer.performerId}
						title={performer.performerName}
						titleLink={performer.performerUrl}
					>
						{Array.from(performer.eventsByDay.entries()).map(
							([dayNum, eventInfo]) => (
								<div
									className="flex flex-col gap-y-4 items-center mb-4"
									key={dayNum}
								>
									<span className="font-headline uppercase text-lg font-bold text-black/80 tracking-wider">
										{festDays[dayNum]}
									</span>
									<ul className="w-[85%]">
										{eventInfo.map((event) => {
											const memo = event.memo.toLowerCase().includes("does")
												? event.memo
														.split(" ")
														.toSpliced(0, 1, "COVERING")
														.join(" ")
												: event.memo;
											return (
												<li
													key={event.event_id}
													className="grid grid-cols-2 gap-12 mb-4"
												>
													<span>
														<a
															href={addresses[event.venue_name]}
															target="_blank"
															rel="noopener noreferrer"
															className="font-bold underline"
														>
															{event.venue_name}
														</a>{" "}
														<span className="grow">
															{memo ? `(${memo})` : ""}
														</span>
													</span>
													<span className="italic font-light">{`${event.start_string} - ${event.end_string}`}</span>
												</li>
											);
										})}
									</ul>
								</div>
							),
						)}
					</ScheduleCard>
				))}
			</div>
		</div>
	);
}

{
	/* <ScheduleCard
							title={result.performer}
							titleLink={result.performer_url ?? ""}
							memoSubtitle={
								result.memo !== "OUTSIDE" && result.memo !== "INSIDE"
									? result.memo
									: ""
							}
							key={result.event_id}
						>
							<div className="flex flex-col gap-y-1 items-center justify-center">
								<span className="font-headline uppercase text-lg font-bold">
									{day}
								</span>
								<div className="grid grid-cols-2 gap-12">
									<span className="">
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
						</ScheduleCard> */
}
