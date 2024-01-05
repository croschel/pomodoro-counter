import React, { useContext } from 'react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCoundownButton,
  StopCoundownButton,
} from './styles'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'
import { FormProvider, useForm } from 'react-hook-form'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O intervalor precisa ser de no mínimo de 5 minutos')
    .max(60, 'O intervalor precisa ser de no máximo de 60 minutos'),
})
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const Home: React.FC = () => {
  const { activeCycle, handleCreateNewCycle, handleInterruptCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, formState, reset } = newCycleForm

  const isSubmitDisabled = Object.keys(formState.errors).length > 0

  const handleSubmitCycle = (data: NewCycleFormData) => {
    handleCreateNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCoundownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} /> Interromper
          </StopCoundownButton>
        ) : (
          <StartCoundownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} /> Começar
          </StartCoundownButton>
        )}
      </form>
    </HomeContainer>
  )
}
