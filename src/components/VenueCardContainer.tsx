import ScheduleCard from "./ScheduleCard";

type EventInfo = {
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
		scheduleByDay.get(event.day)!.add({ ...event });
	}
	console.log("schedule by day: ", scheduleByDay);

	// sort each day desc by start time
	const dailySchedulesSorted: EventInfo[][] = [];
	scheduleByDay.forEach((day) =>
		dailySchedulesSorted.push(
			Array.from(day).sort((a, b) => b.start_time - a.start_time),
		),
	);

	console.log("daily schedules: ", dailySchedulesSorted);

	const days = [
		"Friday, October 23rd",
		"Saturday, October 24th",
		"Sunday, October 25th",
	];

	return (
		<div className="flex flex-col items-center gap-y-5 mt-5">
			<h2 className="text-white text-5xl uppercase tracking-wider font-display">
				{venue}
			</h2>
			<div className="flex flex-col xl:flex-row gap-6">
				{dailySchedulesSorted.map((day, i) => (
					<ScheduleCard title={days[i]}>
						<ul>
							{day.map((event) => (
								<li className="grid grid-cols-2 gap-12 mb-1">
									<span className="text-end italic font-light">
										{event.end_string
											? `${event.start_string} - ${event.end_string}`
											: event.start_string}
									</span>
									{event.performer_url && event.memo ? (
										<div>
											<a
												href={event.performer_url}
												className="font-semibold underline"
											>
												{event.performer}
											</a>{" "}
											<span>({event.memo})</span>
										</div>
									) : event.performer_url ? (
										<a
											href={event.performer_url}
											className="font-semibold underline"
										>
											{event.performer}
										</a>
									) : (
										<span>{event.memo}</span>
									)}
								</li>
							))}
						</ul>
					</ScheduleCard>
				))}
			</div>
		</div>
	);
}
