import { Box } from '@mui/material';
import { ButtonC } from '../../../../components';
import FormDialogC from '../../../../components/FormDialogC/FormDialogC';
import { CreateComponentForm } from '../CreateComponentForm';
import { useCreateUpdateComponentFormDialog } from './hooks';
import { ComponentFormState } from './types';
import { UpdateComponentForm } from '../UpdateComponentForm';

const CreateUpdateComponentFormDialog: React.FC = () => {
	const { createComponent, closeHandler, componentFormState, control, dialogControl, dirtyFields, getValues, importJiraIssue, setValue, touchedFields, updateComponent } =
		useCreateUpdateComponentFormDialog();

	const formValues = getValues();

	return (
		<FormDialogC
			isOpen={dialogControl.isOpen}
			onCloseHandler={closeHandler}
			content={
				componentFormState === ComponentFormState.CREATE ? (
					<CreateComponentForm control={control} dirtyFields={dirtyFields} getValues={getValues} setValue={setValue} />
				) : (
					<UpdateComponentForm control={control} dirtyFields={dirtyFields} getValues={getValues} />
				)
			}
			title={componentFormState === ComponentFormState.CREATE ? 'Create a new component' : 'Update component'}
			dialogActions={
				<Box display='flex'>
					{(touchedFields.componentTitle || touchedFields.componentDescription) && (
						<>
							{componentFormState === ComponentFormState.CREATE && !formValues.jiraIssueId && (
								<ButtonC size='small' disabled={!formValues.componentTitle} variant={'secondary'} onClick={createComponent}>
									Create
								</ButtonC>
							)}
							{componentFormState === ComponentFormState.EDIT && (
								<ButtonC size='small' disabled={!formValues.componentTitle} variant={'secondary'} onClick={updateComponent}>
									Update
								</ButtonC>
							)}
						</>
					)}
					{formValues.jiraIssueId && componentFormState === ComponentFormState.CREATE && (
						<ButtonC size={'small'} variant={'secondary'} onClick={importJiraIssue}>
							Import from Jira
						</ButtonC>
					)}
				</Box>
			}
		/>
	);
};

export default CreateUpdateComponentFormDialog;
