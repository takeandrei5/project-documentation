import { CreateOrganizationModule } from '../modules';
import { useCreateOrganizationGuard } from '../routing';

const CreateOrganizationPage: React.FC = () => {
	const guard = useCreateOrganizationGuard();

	return guard(CreateOrganizationModule);
};

export default CreateOrganizationPage;
