import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, IconButton, type Theme } from '@mui/material';
import Menu from '@mui/material/Menu';
import { useVerticalMenu } from './hooks';
import { type VerticalMenuProps } from './types';

const VerticalMenu: React.FC<VerticalMenuProps> = ({ nodeId, children }) => {
	const { isMenuOpen, moreButtonAnchorEl, onMenuClosedHandler, onMoreIconClickedHandler } = useVerticalMenu(nodeId);

	return (
		<>
			<Box sx={{ position: 'relative' }}>
				<IconButton
					id={`more-button-${nodeId}`}
					aria-controls={isMenuOpen ? `more-menu-${nodeId}` : undefined}
					aria-haspopup='true'
					aria-expanded={isMenuOpen ? 'true' : undefined}
					onClick={onMoreIconClickedHandler}
					sx={{ height: '1.25rem', width: '1.25rem', padding: '0.4rem' }}>
					<MoreHorizIcon sx={{ fontSize: '1.25rem' }} />
				</IconButton>
				<Menu
					anchorEl={moreButtonAnchorEl}
					id={`more-menu-${nodeId}`}
					open={isMenuOpen}
					onClose={onMenuClosedHandler}
					MenuListProps={{
						'aria-labelledby': `more-button-${nodeId}`
					}}
					sx={(theme: Theme) => ({
						'& .MuiPaper-root': { width: 200, borderRadius: '0.5rem' },
						'& .MuiList-root': { padding: '0.5rem' },
						'& .MuiList-root li': { padding: '0.25rem 0.5rem', '&:hover': { borderRadius: '0.25rem', backgroundColor: theme.palette.background.default } },
						'& .MuiListItemIcon-root ': {
							minWidth: '0 !important',
							marginRight: '0.3rem',
							'& span': {
								fontSize: '1rem'
							}
						}
					})}>
					<Box onClick={onMenuClosedHandler}>{children}</Box>
				</Menu>
			</Box>
		</>
	);
};
export default VerticalMenu;
