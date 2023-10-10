import * as MUIIcons from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useMemo, useState } from 'react';
import type { IIconPickerCProps, MuiIconsTabs } from './types.ts';

const IconPickerC: React.FC<IIconPickerCProps> = ({ onClick, width = '20rem', height = '25rem' }) => {
	const [tabValue, setTabValue] = useState<string>('simple');

	const handleTabChange = (_: React.SyntheticEvent, newTabValue: string) => {
		setTabValue(newTabValue);
	};

	const muiIcons = useMemo(() => {
		const iconTabs: MuiIconsTabs = {
			simple: [],
			outlined: [],
			rounded: [],
			sharp: [],
			twoTone: []
		};

		Object.entries(MUIIcons).forEach((icon) => {
			if (icon[0].includes('Outlined')) {
				iconTabs['outlined'].push(icon);
				return;
			}

			if (icon[0].includes('Rounded')) {
				iconTabs['rounded'].push(icon);
				return;
			}

			if (icon[0].includes('Sharp')) {
				iconTabs['sharp'].push(icon);
				return;
			}

			if (icon[0].includes('TwoTone')) {
				iconTabs['twoTone'].push(icon);
				return;
			}

			iconTabs['simple'].push(icon);
		});

		return iconTabs;
	}, []);

	console.log(Object.keys(muiIcons));
	console.log(tabValue);
	return (
		<TabContext value={tabValue}>
			<Box sx={{ height, textAlign: 'center', borderBottom: 1, borderColor: 'divider' }}>
				<TabList onChange={handleTabChange}>
					{Object.keys(muiIcons).map((iconTab: string) => {
						return <Tab key={iconTab} label={iconTab.toUpperCase()} value={iconTab} />;
					})}
				</TabList>
				<TabPanel value='simple'>
					{muiIcons.simple.map((icon) => {
            const MuiIcon = icon[1];
						return <MuiIcon key={icon[0]} />
					})}
				</TabPanel>
				{/* {muiIcons.length &&
				muiIcons.map((icon: string) => {
					return (
						<Icon onClick={onClick} data-value={icon)} sx={(theme: Theme) => ({ color: theme.palette.cyan[60] })}>
							{icon)}
						</Icon>
					);
				})} */}
			</Box>
		</TabContext>
	);
};
export default IconPickerC;
