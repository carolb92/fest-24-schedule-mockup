import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "./ui/card";

type ScheduleCardProps = {
	title: string | undefined;
	children: React.ReactNode;
	footerContent?: string;
	addressSubtitle?: string;
};

export default function ScheduleCard({
	title,
	children,
	footerContent,
	addressSubtitle,
}: ScheduleCardProps) {
	return (
		<Card className="bg-gray-200 h-full w-88 sm:w-100 lg:w-110 pt-0">
			<CardHeader className="bg-gray-300 py-5">
				<CardTitle className="uppercase tracking-wider text-4xl font-display text-center">
					{title}
				</CardTitle>
				{addressSubtitle && (
					<a
						href={`https://www.google.com/maps/place/${encodeURIComponent(addressSubtitle)}`}
						target="_blank"
						rel="noopener noreferrer"
						className="font-display text-xl text-black/60 underline tracking-wide text-center"
					>
						{addressSubtitle}
					</a>
				)}
			</CardHeader>
			<CardContent>{children}</CardContent>
			{footerContent && <CardFooter>{footerContent}</CardFooter>}
		</Card>
	);
}
