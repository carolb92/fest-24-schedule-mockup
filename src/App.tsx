import { useState } from "react";
import schedule from "@/data/events.json";
import VenueCardContainer from "@/components/VenueCardContainer";

function App() {
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
		<main className="flex flex-col py-16 px-10 items-center bg-black min-h-screen gap-y-2">
			<h1 className="uppercase text-center mb-3 text-white text-5xl tracking-wider font-light">
				the fest 24 schedule
			</h1>

			<label htmlFor="venue-select" className="text-white mt-4 uppercase">
				View by venue
			</label>
			<select
				value={venueShown}
				onChange={(e) => setVenueShown(e.target.value)}
				id="venue-select"
				className="bg-white rounded-sm w-80 truncate"
			>
				{sortedVenueList.map((venue) => (
					<option value={venue} key={venue}>
						{venue}
					</option>
				))}
			</select>

			<VenueCardContainer venue={venueShown} venueSchedule={venueSchedule} />
		</main>
	);
}

export default App;
