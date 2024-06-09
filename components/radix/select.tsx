import * as Select from "@radix-ui/react-select";

const SelectCategoria = () => (
	<Select.Root>
		<Select.Trigger>
			<Select.Value />
			<Select.Icon />
		</Select.Trigger>

		<Select.Portal>
			<Select.Content>
				<Select.ScrollUpButton />
				<Select.Viewport>
					<Select.Item value='categoria'>
						<Select.ItemText />
						<Select.ItemIndicator />
					</Select.Item>

					<Select.Group>
						<Select.Label />
						<Select.Item value='categoria'>
							<Select.ItemText />
							<Select.ItemIndicator />
						</Select.Item>
					</Select.Group>

					<Select.Separator />
				</Select.Viewport>
				<Select.ScrollDownButton />
				<Select.Arrow />
			</Select.Content>
		</Select.Portal>
	</Select.Root>
);

export default SelectCategoria;
