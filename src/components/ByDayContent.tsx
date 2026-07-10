import { useState } from "react";
import schedule from "@/data/events.json";
import Select from "@/components/Select";
import { festDays, addresses } from "@/lib/constants";
import { type EventInfo } from "./VenueCardContainer";
import ScheduleCard from "./ScheduleCard";
import EventList from "./EventList";

export default function ByDayContent() {
	const [dayShown, setDayShown] = useState(festDays[1]);

	const eventsByDay = new Map();
	for (const event of schedule) {
		if (!eventsByDay.has(event.day)) eventsByDay.set(event.day, new Set());
		eventsByDay.get(event.day).add(event);
	}

	const dayKey = Object.keys(festDays).find(
		(key) => festDays[Number(key)] === dayShown,
	);

	const daySchedule = eventsByDay.get(Number(dayKey));

	//TODO: make a types file and export the EventInfo type to reuse here
	// group the day's schedule by venue
	const scheduleByVenue = new Map<string, Set<EventInfo>>();
	for (const event of daySchedule) {
		if (!scheduleByVenue.has(event.venue_name)) {
			scheduleByVenue.set(event.venue_name, new Set());
		}
		scheduleByVenue.get(event.venue_name)!.add(event);
	}

	// sort by venue name ascending and events descending
	const sortedVenueSchedules = Array.from(scheduleByVenue.entries())
		.map(([venueName, events]): [string, EventInfo[]] => [
			venueName,
			Array.from(events).sort((a, b) => b.start_time - a.start_time),
		])
		.sort((a, b) => a[0].localeCompare(b[0]));

	const dayDisplay = dayShown.split(",");

	return (
		<div className="flex flex-col items-center gap-y-4 mt-5">
			<Select
				htmlForId="day-select"
				selectValue={dayShown}
				onChange={setDayShown}
				optionList={Object.values(festDays)}
				labelText="select a day"
			/>
			<h2 className="uppercase tracking-wider font-display mt-4 flex flex-col md:flex-row items-center gap-x-1.5">
				<span className="text-5xl text-white/80">{dayDisplay[0]}</span>
				<span className="text-4xl md:text-5xl text-teal-900">
					{dayDisplay[1]}
				</span>
			</h2>
			<div className="flex flex-col xl:flex-row flex-wrap gap-6 justify-around">
				{sortedVenueSchedules.map(([venueName, events]) => (
					<ScheduleCard
						title={venueName}
						key={venueName}
						addressSubtitle={addresses[venueName]}
					>
						<EventList events={events} />
					</ScheduleCard>
				))}
			</div>
		</div>
	);
}
