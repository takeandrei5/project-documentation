import { CreateOrganizationModule } from '../modules';
import { useOrganizationGuard } from '../routing';

const CreateOrganizationPage: React.FC = () => {
  const guard = useOrganizationGuard();

	return guard(CreateOrganizationModule);
};

export default CreateOrganizationPage;
