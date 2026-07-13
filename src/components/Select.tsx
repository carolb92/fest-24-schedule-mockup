type SelectProps = {
	htmlForId: string;
	selectValue: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
	optionList: string[];
	labelText: string;
};

export default function Select({
	htmlForId,
	selectValue,
	onChange,
	optionList,
	labelText,
}: SelectProps) {
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
				onChange={(e) => onChange(e.target.value)}
				id={htmlForId}
				className="bg-white rounded-sm w-80 truncate"
			>
				{optionList.map((o) => (
					<option value={o} key={o}>
						{o}
					</option>
				))}
			</select>
		</div>
	);
}
