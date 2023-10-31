import type {CreateComponentFormCProps} from './types.ts'
import {Box,Typography} from '@mui/material'
import {TextFieldC} from '../../../../components'
import {Controller} from 'react-hook-form'

const CreateComponentFormC:React.FC<CreateComponentFormCProps> = ({control}) => {
  return (
    <Box>
      <Controller
        control={control}
        name="title"
        render={({field: {onChange, value}, formState: {errors}}) => (
          <>
            <TextFieldC id={'title'} value={value} onChange={onChange} label={'Title'}/>
            {errors && errors['title'] && <Typography>{errors['title'].message}</Typography>}
          </>
        )}
      />
      <Controller
        control={control}
        name="projectId"
        render={({field: {onChange, value}, formState: {errors}}) => (
          <>
            <TextFieldC id={'projectId'} value={value} onChange={onChange} label={'Project ID'}/>
            {errors && errors['projectId'] && <Typography>{errors['projectId'].message}</Typography>}
          </>
        )}
      />
    </Box>
  )
}
export default CreateComponentFormC