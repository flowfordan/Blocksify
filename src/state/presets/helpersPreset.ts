const helpersDefPreset = [
	{
		helperID: 0,
		type: 'snap',
		name: 'Spacing',
		isActive: false,
		value: 2,
		valueName: '',
		isRange: true,
		rangeMin: 0.5,
		rangeMax: 5,
		rangeStep: 0.5,
		isSelection: false,
		numbers: []
	},
	{
		helperID: 1,
		type: 'snap',
		name: 'Angle',
		isActive: false,
		value: 2,
		valueName: '',
		isRange: false,
		rangeMin: 0,
		rangeMax: 0,
		rangeStep: 0,
		isSelection: true,
		variants: [1, 2, 5, 10, 20, 30, 45, 90],
		numbers: [20, 30]
	},
	{
		helperID: 2,
		type: 'snap',
		name: 'Grid',
		isActive: true,
		value: 0,
		valueName: '',
		isRange: false,
		rangeMin: 0,
		rangeMax: 0,
		rangeStep: 0,
		isSelection: false,
		numbers: []
	},
	{
		helperID: 3,
		type: 'grid',
		name: 'Show',
		isActive: true,
		value: 10,
		valueName: 'size',
		isRange: true,
		rangeMin: 0.5,
		rangeMax: 20,
		rangeStep: 0.5,
		isSelection: false,
		numbers: []
	},
];

export { helpersDefPreset }