import { HistoryContainer, HistoryList, Status } from "./style";

export function History(){
    return(
        <HistoryContainer>
            <h1>Meu Historico</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Inicio</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>ha 2 meses</td>
                            <td><Status statusColor="green">concluido</Status></td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>ha 2 meses</td>
                            <td><Status statusColor="red">cancelado</Status></td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}