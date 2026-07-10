import ScheduleCard from "./ScheduleCard";
import EventList from "./EventList";
import { festDays, addresses } from "@/lib/constants";

export type EventInfo = {
	day: number;
	end_string: string | null;
	end_time: number | null;
	memo: string;
	start_string: string;
	start_time: number;
	venue_id: number;
	venue_name: string;
	event_id: string;
	performer?: string;
	performer_url?: string;
	performer_id?: string;
};

type VenueCardContainerProps = {
	venue: string;
	venueSchedule: Set<EventInfo>;
};

export default function VenueCardContainer({
	venue,
	venueSchedule,
}: VenueCardContainerProps) {
	// group venueSchedule by day
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

	const venueAddress = addresses[venue];

	return (
		<div className="flex flex-col items-center gap-y-4 mt-5">
			<h2 className="text-5xl uppercase tracking-wider font-display text-white/80 text-center">
				{venue}
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
	);
}
