import ByVenueContent from "@/components/ByVenueContent";
import ByDayContent from "@/components/ByDayContent";
import SearchContent from "@/components/SearchContent";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MapPin, CalendarDays, Guitar } from "lucide-react";
import { useIsMobile } from "./hooks/use-mobile";

const tabsList = [
	{ value: "venue", display: "view by venue", icon: MapPin },
	{ value: "day", display: "view by day", icon: CalendarDays },
	{ value: "search", display: "search performers", icon: Guitar },
];

function App() {
	const isMobile = useIsMobile();

	return (
		<main className="flex flex-col py-16 px-3 md:px-10 items-center bg-black min-h-screen gap-y-2 w-screen">
			<h1 className="uppercase text-center mb-3 text-white/80 text-5xl tracking-wider font-light font-headline">
				the fest 24 schedule
			</h1>

			<Tabs
				defaultValue="venue"
				className="w-100 max-w-full md:w-full font-headline flex justify-center items-center"
			>
				<TabsList variant="line" className="max-w-full">
					{tabsList.map(({ value, display, icon: Icon }) => (
						<TabsTrigger
							value={value}
							className="uppercase text-white/80 data-active:text-teal-300 data-active:border-b-2 data-active:border-b-teal-300 rounded-b-none hover:text-teal-200"
							key={value}
						>
							{!isMobile && <Icon className="size-4" />}
							<span className="text-xs md:text-base">{display}</span>
						</TabsTrigger>
					))}
				</TabsList>
				<TabsContent value="venue">
					<ByVenueContent />
				</TabsContent>
				<TabsContent value="day">
					<ByDayContent />
				</TabsContent>
				<TabsContent value="search">
					<SearchContent />
				</TabsContent>
			</Tabs>
		</main>
	);
}

export default App;
