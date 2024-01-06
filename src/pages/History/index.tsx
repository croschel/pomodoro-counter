import React, { useContext } from 'react'
import ptBR from 'date-fns/locale/pt-BR'
import { HistoryContainer, HistoryList, Status } from './styles'
import { CyclesContext } from '../../contexts/CyclesContext'
import { Cycle } from '../../@types/cycles'
import { formatDistanceToNow } from 'date-fns'

// import { Container } from './styles';

export const History: React.FC = () => {
  const { cycles } = useContext(CyclesContext)

  const renderStatusComponent = (cycle: Cycle) => {
    if (cycle.finishedDate) {
      return <Status statusColor="green">Concluído</Status>
    } else if (cycle.interruptedDate) {
      return <Status statusColor="red">Interrompido</Status>
    } else if (!cycle.finishedDate && !cycle.interruptedDate) {
      return <Status statusColor="yellow">Em andamento</Status>
    }
  }
  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    // @ts-ignore
                    locale: ptBR,
                  })}
                </td>
                <td>{renderStatusComponent(cycle)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
