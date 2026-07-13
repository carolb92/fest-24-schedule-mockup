import { type EventInfo } from "@/types";

type EventListProps = {
	events: EventInfo[];
};

export default function EventList({ events }: EventListProps) {
	return (
		<ul>
			{events.map((event) => (
				<li className="grid grid-cols-2 gap-12 mb-1" key={event.event_id}>
					<span className="text-end italic font-light">
						{event.end_string
							? `${event.start_string} - ${event.end_string}`
							: event.start_string}
					</span>
					{event.performer_url && event.memo ? (
						<div>
							<a href={event.performer_url} className="font-semibold underline">
								{event.performer}
							</a>{" "}
							<span>({event.memo})</span>
						</div>
					) : event.performer_url ? (
						<a href={event.performer_url} className="font-semibold underline">
							{event.performer}
						</a>
					) : (
						<span>{event.memo}</span>
					)}
				</li>
			))}
		</ul>
	);
}
