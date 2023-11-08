import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import type {CreateComponentFormValidationSchema} from './schema.ts'
import {createComponentFormSchema} from './schema.ts'

const useCreateComponent = (closeHandler:() => void) => {
  const {
          control,
          handleSubmit,
          reset,

          watch,
          formState: {
            errors,
            dirtyFields,
            isValid
          }
        } = useForm<CreateComponentFormValidationSchema>({
    resolver: zodResolver(createComponentFormSchema),
    defaultValues: {
      project: '',
      issue: '',
      componentTitle: ''
    }
  })
  const onSubmitHandler = handleSubmit((data:CreateComponentFormValidationSchema) => {
    console.log(data)
  })

  const submitCallback = () => {
    const {title, projectId} = getValues()
    if (!isValid) {
      return
    }
    const callbackResponse = () => {console.log('Callback from CreateComponentFormC')}
    const payloadMessage = {
      responseMessage: 'DATA_COMPONENT_MODAL',
      callbackResponse: callbackResponse.toString(),
      responseData: {title: title, content: projectId}
    }
    window.postMessage(payloadMessage)
    closeHandler()
  }
  const values = watch()
  const projectValue = values['project']
  const issueValue = values['issue']
  const componentTitleValue = values['componentTitle']
  const isComponentTitleDirty = dirtyFields['componentTitle']
  return {control, onSubmitHandler, errors, isValid, issueValue, projectValue, componentTitleValue, isComponentTitleDirty, submitCallback, reset}
}
export default useCreateComponent