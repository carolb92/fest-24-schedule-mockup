import { useState } from "react";
import schedule from "@/data/events.json";
import VenueCardContainer from "@/components/VenueCardContainer";
import Select from "@/components/Select";

export default function ByVenueContent() {
	const eventsByVenue = new Map();
	for (const event of schedule) {
		if (!eventsByVenue.has(event.venue_name))
			eventsByVenue.set(event.venue_name, new Set());
		eventsByVenue.get(event.venue_name).add(event);
	}

	const sortedVenueList = Array.from(eventsByVenue.keys()).sort();

	const [venueShown, setVenueShown] = useState(sortedVenueList[1]);
	const venueSchedule = eventsByVenue.get(venueShown);

	return (
		<div className="flex flex-col items-center gap-y-3 px-4">
			<Select
				htmlForId="venue-select"
				selectValue={venueShown}
				onChange={setVenueShown}
				optionList={sortedVenueList}
				labelText="select a venue"
			/>
			<VenueCardContainer venue={venueShown} venueSchedule={venueSchedule} />
		</div>
	);
}
