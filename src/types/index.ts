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
