import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import type {CreateComponentFormValidationSchema} from './schema.ts'
import {createComponentFormSchema} from './schema.ts'

const useCreateComponent = () => {
  const {control, handleSubmit, getValues, formState: {errors, isValid}} = useForm<CreateComponentFormValidationSchema>({
    resolver: zodResolver(createComponentFormSchema)
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
    dialogControl.closeHandler()
  }
  return {control, onSubmitHandler, errors, isValid, getValues, submitCallback}
}
export default useCreateComponent