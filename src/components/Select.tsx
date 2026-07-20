type SelectProps<T extends string | number> = {
	htmlForId: string;
	selectValue: T;
	onChange: React.Dispatch<React.SetStateAction<T>>;
	optionList: { value: T; label: string }[];
	labelText: string;
};

export default function Select<T extends string | number>({
	htmlForId,
	selectValue,
	onChange,
	optionList,
	labelText,
}: SelectProps<T>) {
	return (
		<div className="flex flex-col">
			<label
				htmlFor={htmlForId}
				className="text-teal-600 mt-4 mb-1 uppercase font-headline font-semibold"
			>
				{labelText}
			</label>
			<select
				value={selectValue}
				onChange={(e) => {
					const match = optionList.find(
						(o) => String(o.value) === e.target.value,
					);
					if (match) onChange(match.value);
				}}
				id={htmlForId}
				className="bg-white rounded-sm w-80 truncate"
			>
				{optionList.map((o) => (
					<option value={o.value} key={o.value}>
						{o.label}
					</option>
				))}
			</select>
		</div>
	);
}
