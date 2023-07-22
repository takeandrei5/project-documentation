import { Route, Routes } from 'react-router-dom';
import { CreatePRDPage, HomePage, PRDPage } from '../../pages';
import { AuthenticationGuard } from '../../components';

const RouterProvider: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-project-documentation" element={<AuthenticationGuard component={CreatePRDPage} />} />
      <Route path="/project-documentation/:id" element={<AuthenticationGuard component={PRDPage} />} />
      <Route path="*" element={<>Not found ...</>} />
    </Routes>
  );
}

export default RouterProvider