import * as MUIIcons from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Popover, Tab, type Theme } from '@mui/material';
import { memo } from 'react';
import { Grid, type GridCellProps } from 'react-virtualized';
import { useIconPicker } from './hooks.tsx';
import type { IIconPickerCProps, MuiIconTabName } from './types.ts';

const IconPickerC: React.FC<IIconPickerCProps> = memo(({ onIconSelectedHandler, initialIcon = MUIIcons.TextSnippet }) => {
	const { anchorElement, handleTabChange, isIconSelectionOpen, matrixIcons, muiIcons, renderIcons, selectedIcon, setIsIconSelectionOpen, tabValue } = useIconPicker(
		onIconSelectedHandler,
		initialIcon
	);

	const SelectedIcon = selectedIcon;
	return (
		<>
			<Box
				id='selected-icon-box'
				onClick={() => {
					setIsIconSelectionOpen(true);
				}}
				sx={(theme: Theme) => ({
					backgroundColor: theme.palette.background.default,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '2.0625rem',
					width: '1.875rem',
					borderRadius: '0.25rem',
					borderStyle: 'solid',
					borderWidth: '0.0625rem',
					borderColor: theme.palette.cyan[20]
				})}>
				<SelectedIcon
					sx={(theme: Theme) => ({
						color: theme.palette.textColor[100],
						cursor: 'pointer'
					})}
				/>
			</Box>
			{anchorElement && (
				<Popover id='cool-id' anchorEl={anchorElement} open onClose={() => setIsIconSelectionOpen(false)} sx={{ visibility: !isIconSelectionOpen ? 'hidden' : 'visible' }}>
					<TabContext value={tabValue}>
						<Box sx={{ height: '14rem', textAlign: 'center', borderBottom: 1, borderColor: 'divider', width: '29.8125rem' }}>
							<TabList onChange={handleTabChange}>
								{Object.keys(muiIcons).map((iconTab: string) => {
									return <Tab key={iconTab} label={iconTab.toUpperCase()} value={iconTab} />;
								})}
							</TabList>
							{Object.keys(muiIcons).map((iconTab: string) => {
								return (
									<TabPanel
										key={iconTab}
										value={iconTab}
										sx={{
											overflowY: 'auto',
											padding: 0,
											maxHeight: '11rem',
											'&[hidden]': { display: 'none !important' }
										}}>
										<Grid
											height={176}
											rowHeight={39.08}
											cellRenderer={(props: GridCellProps) => renderIcons(props, iconTab as MuiIconTabName)}
											columnWidth={39.08}
											columnCount={12}
											rowCount={matrixIcons.current[iconTab as MuiIconTabName].length}
											width={477}
											style={{
												padding: '0.5rem 0.25rem 0.5rem 0.25rem'
											}}
											overscanRowCount={30}
										/>
									</TabPanel>
								);
							})}

							{/* <TabPanel
								value='outlined'
								sx={{
									display: 'grid',
									gridTemplateColumns: 'repeat(12, 1fr)',
									justifyItems: 'center',
									gap: '0.25rem',
									overflowY: 'auto',
									padding: '0.5rem',
									maxHeight: '11rem',
									'&[hidden]': { display: 'none !important' }
								}}>
								{renderIcons(muiIcons.outlined)}
							</TabPanel>
							<TabPanel
								value='rounded'
								sx={{
									display: 'grid',
									gridTemplateColumns: 'repeat(12, 1fr)',
									justifyItems: 'center',
									gap: '0.25rem',
									overflowY: 'auto',
									padding: '0.5rem',
									maxHeight: '11rem',
									'&[hidden]': { display: 'none !important' }
								}}>
								{renderIcons(muiIcons.rounded)}
							</TabPanel>
							<TabPanel
								value='sharp'
								sx={{
									display: 'grid',
									gridTemplateColumns: 'repeat(12, 1fr)',
									justifyItems: 'center',
									gap: '0.25rem',
									overflowY: 'auto',
									padding: '0.5rem',
									maxHeight: '11rem',
									'&[hidden]': { display: 'none !important' }
								}}>
								{renderIcons(muiIcons.sharp)}
							</TabPanel>
							<TabPanel
								value='twoTone'
								sx={{
									display: 'grid',
									gridTemplateColumns: 'repeat(12, 1fr)',
									justifyItems: 'center',
									gap: '0.25rem',
									overflowY: 'auto',
									padding: '0.5rem',
									maxHeight: '11rem',
									'&[hidden]': { display: 'none !important' }
								}}>
								{renderIcons(muiIcons.twoTone)}
							</TabPanel> */}
						</Box>
					</TabContext>
				</Popover>
			)}
		</>
	);
});

export default IconPickerC;
