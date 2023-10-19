import * as MUIIcons from '@mui/icons-material';
import { Tooltip, type Theme } from '@mui/material';
import _ from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { GridCellProps } from 'react-virtualized';
import type { MuiIcon, MuiIconTab, MuiIconTabName, MuiIconsTabs, MuiIconsTabsGrid } from './types.ts';
import type { MUIIconKeys } from '../../utils/types.ts';

const useIconPicker = (onIconSelectedHandler: (iconName: MUIIconKeys) => void, initialIcon = MUIIcons.TextSnippet) => {
	const [tabValue, setTabValue] = useState<string>('simple');
	const [isIconSelectionOpen, setIsIconSelectionOpen] = useState<boolean>(false);
	const [selectedIcon, setSelectedIcon] = useState<MuiIcon>(initialIcon);
	const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
	const matrixIcons = useRef<MuiIconsTabsGrid>({
		simple: [],
		outlined: [],
		rounded: [],
		sharp: [],
		twoTone: []
	});

	const muiIcons = useMemo(() => {
		const iconsTabs: MuiIconsTabs = {
			simple: [],
			outlined: [],
			rounded: [],
			sharp: [],
			twoTone: []
		};

		Object.entries(MUIIcons).forEach((icon: MuiIconTab) => {
			if (icon[0].includes('Outlined')) {
				iconsTabs.outlined.push(icon);
				return;
			}

			if (icon[0].includes('Rounded')) {
				iconsTabs.rounded.push(icon);
				return;
			}

			if (icon[0].includes('Sharp')) {
				iconsTabs.sharp.push(icon);
				return;
			}

			if (icon[0].includes('TwoTone')) {
				iconsTabs.twoTone.push(icon);
				return;
			}

			iconsTabs.simple.push(icon);
		});

		fillInMatrixIcons(iconsTabs.simple, 'simple');
		fillInMatrixIcons(iconsTabs.outlined, 'outlined');
		fillInMatrixIcons(iconsTabs.rounded, 'rounded');
		fillInMatrixIcons(iconsTabs.sharp, 'sharp');
		fillInMatrixIcons(iconsTabs.twoTone, 'twoTone');

		return iconsTabs;
	}, []);

	useEffect(() => {
		setSelectedIcon(initialIcon);
	}, [initialIcon]);

	useEffect(() => {
		setTimeout(() => {
			const selectedIconBox = document.getElementById('selected-icon-box');
			setAnchorElement(selectedIconBox);
		});
	}, []);

	const handleSelectedIconChange = (iconName: MUIIconKeys, icon: MuiIcon) => {
		setSelectedIcon(icon);
		setIsIconSelectionOpen(false);
		onIconSelectedHandler(iconName);
	};

	const handleTabChange = (_: React.SyntheticEvent, newTabValue: string) => {
		setTabValue(newTabValue);
	};

	function fillInMatrixIcons(iconTabs: MuiIconTab[], iconTabName: MuiIconTabName) {
		const iconTabsClone = _.cloneDeep(iconTabs);

		while (iconTabsClone.length) {
			matrixIcons.current[iconTabName].push(iconTabsClone.splice(0, 12));
		}
	}

	const renderIcons = ({ key, columnIndex, rowIndex, style }: GridCellProps, iconTabName: MuiIconTabName) => {
		const icon = matrixIcons.current[iconTabName][rowIndex][columnIndex];
		if (!icon) return null;
		const MuiIcon = icon[1];

		if (!icon || !icon[0]) {
			return null;
		}

		return (
			<Tooltip key={`${icon[0]}-${key}`} title={icon[0]}>
				<MuiIcon
					onClick={() => {
						handleSelectedIconChange(icon[0] as MUIIconKeys, icon[1]);
					}}
					sx={(theme: Theme) => ({
						...style,
						cursor: 'pointer',
						fill: icon[1] === selectedIcon ? theme.palette.cyan[20] : theme.palette.textColor[100],
						paddingLeft: '0.25rem',
						paddingRight: '0.25rem'
					})}
				/>
			</Tooltip>
		);
	};

	return { anchorElement, handleTabChange, isIconSelectionOpen, matrixIcons, muiIcons, renderIcons, selectedIcon, setIsIconSelectionOpen, tabValue };
};

export { useIconPicker };
