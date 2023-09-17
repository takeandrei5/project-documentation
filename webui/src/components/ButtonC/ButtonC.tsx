import { Button } from '@mui/material';
import useButtonC from './hooks';
import type { ButtonCProps } from './types';

const ButtonC: React.FC<ButtonCProps> = ({ size, variant, children, onClick, type = 'button' }) => {
	const { sizeStyles, variantStyles } = useButtonC();

	return (
		<Button
			disableRipple
			disableFocusRipple
			disableTouchRipple
			onClick={onClick}
			type={type}
			sx={{
				...sizeStyles[size],
				...variantStyles[variant],
				borderRadius: '0.5rem',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: '0.875rem',
				fontStyle: 'normal',
				lineHeight: '1.3125rem',
				letterSpacing: '0.0175rem',
				textAlign: 'center',
				textTransform: 'none'
			}}>
			{children}
		</Button>
	);
};

export default ButtonC;
