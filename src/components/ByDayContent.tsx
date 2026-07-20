import { useState } from "react";
import schedule from "@/data/events.json";
import Select from "@/components/Select";
import { festDays, addresses } from "@/lib/constants";
import { type EventInfo } from "@/types";
import ScheduleCard from "./ScheduleCard";
import EventList from "./EventList";

const eventsByDay = new Map<number, EventInfo[]>();
for (const event of schedule) {
	if (!eventsByDay.has(event.day)) eventsByDay.set(event.day, []);
	eventsByDay.get(event.day)!.push(event);
}

export default function ByDayContent() {
	const [dayShown, setDayShown] = useState(1);

	const daySchedule = eventsByDay.get(dayShown) ?? [];

	// group the day's schedule by venue
	const scheduleByVenue = new Map<string, EventInfo[]>();
	for (const event of daySchedule) {
		if (!scheduleByVenue.has(event.venue_name)) {
			scheduleByVenue.set(event.venue_name, []);
		}
		scheduleByVenue.get(event.venue_name)!.push(event);
	}

	// sort by venue name ascending and events descending
	const sortedVenueSchedules = Array.from(scheduleByVenue.entries())
		.map(([venueName, events]): [string, EventInfo[]] => [
			venueName,
			events.sort((a, b) => b.start_time - a.start_time),
		])
		.sort((a, b) => a[0].localeCompare(b[0]));

	const dayDisplay = festDays[dayShown].split(",");

	return (
		<div className="flex flex-col items-center gap-y-4 mt-5">
			<Select
				htmlForId="day-select"
				selectValue={dayShown}
				onChange={setDayShown}
				optionList={Object.entries(festDays).map(([day, label]) => ({
					value: Number(day),
					label,
				}))}
				labelText="select a day"
			/>
			<h2 className="uppercase tracking-wider font-display mt-4 flex flex-col md:flex-row items-center gap-x-1.5">
				<span className="text-5xl text-white/80">{dayDisplay[0]}</span>
				<span className="text-4xl md:text-5xl text-teal-900">
					{dayDisplay[1]}
				</span>
			</h2>
			<div className="gap-6 grid grid-cols-1 xl:grid-cols-3">
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
