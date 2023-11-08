import type {CreateComponentFormCProps} from './types.ts'
import {Box, Divider, Typography} from '@mui/material'
import {TextFieldC} from '../../../../components'
import {Controller} from 'react-hook-form'
import {DropdownFieldC} from '../../../../components/DropdownFieldC'
import {CheckboxFieldC} from '../../../../components/CheckboxFieldC'
import type {DropdownOption} from '../../../../components/DropdownFieldC/types.ts'
import {useEffect, useRef} from 'react'

export type ProjectsListProps = {
  projects:Project[];
  total:number;
};

export type Project = {
  id:number;
  key:string;
  name:string;
};

export type IssuesListProps = {
  issues:Issue[];
  total:number;
};

export type Issue = {
  id:number;
  key:string;
  name:string;
};

const CreateComponentFormC:React.FC<CreateComponentFormCProps> = ({control, projectValue, isComponentTitleDirty, componentTitleValue}) => {
  const projectsData:ProjectsListProps = {
    projects: [
      {id: 'project-id-1', key: 'project-key-1', name: 'Project 1'},
      {id: 'project-id-2', key: 'project-key-2', name: 'Project 2'},
      {id: 'project-id-3', key: 'project-key-3', name: 'Project 3'}
    ],
    total: 3
  }
  const mapProjectsToDropdownHandler = (projects:Project[]):DropdownOption[] => {
    return projects.map((project:Project) => {
      return {value: project.id, label: project.name}
    })
  }

  const issuesData:IssuesListProps = {
    issues: [
      {id: 'issue-id-1', key: 'issue-key-1', name: 'Issues 1'},
      {id: 'issue-id-2', key: 'issue-key-2', name: 'Issue 2'},
      {id: 'issue-id-3', key: 'issue-key-3', name: 'Issue 3'}
    ],
    total: 3
  }
  const mapIssuesToDropdownHandler = (issues:Issue[]):DropdownOption[] => {
    return issues.map((issue:Issue) => {
      return {value: issue.id, label: issue.name}
    })
  }

  const titleRef = useRef({isComponentTitleDirty: false})
  useEffect(() => {
    if (isComponentTitleDirty) {
      titleRef.current.isComponentTitleDirty = true
    }
    return () => titleRef.current.isComponentTitleDirty = false

  }, [isComponentTitleDirty])
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
      <Controller
        control={control}
        defaultValue={''}
        name="project"
        render={({field: {onChange, value}, formState: {errors}}) => (
          <Box>
            <DropdownFieldC id={'project'}
                            value={value}
                            name={'project'}
                            onChange={onChange}
                            label={'Select one project'}
                            options={mapProjectsToDropdownHandler(projectsData.projects)}
            />
            {errors && errors['project'] && <Typography sx={(theme) => ({color: theme.palette.red[80]})} variant={'smallMedium'}>{errors['project'].message}</Typography>}
          </Box>
        )}
      />
      {projectValue && <Divider><Typography>Placeholder title</Typography></Divider>}
      {projectValue && <Controller
        control={control}
        defaultValue={''}
        name="issue"
        render={({field: {onChange, value}, formState: {errors}}) => (
          <Box>
            <DropdownFieldC id={'issue'} value={value} name={'issue'} onChange={onChange} label={'Select one issue'} options={mapIssuesToDropdownHandler(issuesData.issues)}/>
            {errors && errors['issue'] && <Typography sx={(theme) => ({color: theme.palette.red[80]})} variant={'smallMedium'}>{errors['issue'].message}</Typography>}
          </Box>
        )}
      />}
      {projectValue && <Controller
        control={control}
        defaultValue={''}
        name="componentTitle"
        render={({field: {onChange, value}, formState: {errors}}) => (
          <Box>
            <TextFieldC id={'componentTitle'} value={value} onChange={onChange} label={'Component title'}/>
            {errors && errors['componentTitle'] &&
              <Typography sx={(theme) => ({color: theme.palette.red[80]})} variant={'smallMedium'}>{errors['componentTitle'].message}</Typography>}
          </Box>
        )}
      />}
      {(componentTitleValue || titleRef.current.isComponentTitleDirty) && <Controller
        control={control}
        defaultValue={false}
        name="jira"
        render={({field: {onChange, value}, formState: {errors}}) => (
          <Box>
            <CheckboxFieldC id={'jira'} value={value} name={'jira'} onChange={onChange} label={'Sync with Jira?'} disabled={!componentTitleValue}/>
            {errors && errors['jira'] && <Typography sx={(theme) => ({color: theme.palette.red[80]})} variant={'smallMedium'}>{errors['jira'].message}</Typography>}
          </Box>
        )}
      />}
    </Box>
  )
}
export default CreateComponentFormC