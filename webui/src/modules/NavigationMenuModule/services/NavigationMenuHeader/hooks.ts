import { useNavigate, useParams } from 'react-router-dom';

const useNavigationMenuHeader = () => {
	const navigate = useNavigate();
	const params = useParams<{ projectId: string; organizationId: string }>();

	const onClickHandler = (): void => {
		console.log('click');
	};

	const onProjectNameClickedHandler = (): void => {
    navigate(`/organizations/${params.organizationId!}/projects/${params.projectId!}/project-documentation`);
	};

	return { onProjectNameClickedHandler, onClickHandler };
};

export { useNavigationMenuHeader };
