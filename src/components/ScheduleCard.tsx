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
};

export default function ScheduleCard({
	title,
	children,
	footerContent,
}: ScheduleCardProps) {
	return (
		<Card className="bg-gray-200 h-full w-88 sm:w-100 lg:w-110 pt-0">
			<CardHeader className="bg-gray-300 py-5">
				<CardTitle className="uppercase tracking-wider text-3xl text-center font-display">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
			{footerContent && <CardFooter>{footerContent}</CardFooter>}
		</Card>
	);
}
