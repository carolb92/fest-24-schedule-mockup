import { useState } from "react";
import schedule from "@/data/events.json";
import Select from "@/components/Select";
import ScheduleCard from "./ScheduleCard";
import EventList from "./EventList";
import { festDays, addresses } from "@/lib/constants";
import { type EventInfo } from "@/types";

const eventsByVenue = new Map();
for (const event of schedule) {
	if (!eventsByVenue.has(event.venue_name))
		eventsByVenue.set(event.venue_name, new Set());
	eventsByVenue.get(event.venue_name).add(event);
}

const sortedVenueList = Array.from(eventsByVenue.keys()).sort();

export default function ByVenueContent() {
	const [venueShown, setVenueShown] = useState(sortedVenueList[1]); // skipping reg as default venue shown
	const venueSchedule = eventsByVenue.get(venueShown);

	const scheduleByDay = new Map<number, Set<EventInfo>>();
	for (const event of venueSchedule) {
		if (!scheduleByDay.has(event.day)) {
			scheduleByDay.set(event.day, new Set<EventInfo>());
		}
		scheduleByDay.get(event.day)!.add(event);
	}

	// sort each day desc by start time
	const dailySchedulesSorted = Array.from(scheduleByDay.entries()).map(
		([dayNum, events]): [number, EventInfo[]] => [
			dayNum,
			Array.from(events).sort((a, b) => b.start_time - a.start_time),
		],
	);

	const venueAddress = addresses[venueShown];

	return (
		<div className="flex flex-col items-center gap-y-3 px-4">
			<Select
				htmlForId="venue-select"
				selectValue={venueShown}
				onChange={setVenueShown}
				optionList={sortedVenueList}
				labelText="select a venue"
			/>
			<div className="flex flex-col items-center gap-y-4 mt-5">
				<h2 className="text-5xl uppercase tracking-wider font-display text-white/80 text-center">
					{venueShown}
				</h2>
				<a
					className="text-teal-600 text-lg text-center uppercase underline"
					href={`https://www.google.com/maps/place/${encodeURIComponent(venueAddress)}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					{venueAddress}
				</a>
				<div className="flex flex-col xl:flex-row gap-6">
					{dailySchedulesSorted.map(([dayNum, day]) => {
						return (
							<ScheduleCard title={festDays[dayNum]} key={dayNum}>
								<EventList events={day} />
							</ScheduleCard>
						);
					})}
				</div>
			</div>
		</div>
	);
}
