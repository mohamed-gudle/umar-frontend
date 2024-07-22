import {
    BadgeDelta,
    DeltaType,
    Card,
    Flex,
    Metric,
    ProgressBar,
    Text,
  } from '@tremor/react'
  
  export type Kpi = {
    title: string
    metric: string
    progress: number
    metricTarget: string
    delta: string
    deltaType: DeltaType
  }
  
  interface Props {
    kpi: Kpi
  }
  
  const KpiCard = ({ kpi }: Props) => {
    return (
      <Card className="max-w-lg">
        <Flex alignItems="start">
          <div>
            <Text>{kpi.title}</Text>
            <Metric>{kpi.metric}</Metric>
          </div>
          <BadgeDelta deltaType={kpi.deltaType}>{kpi.delta}</BadgeDelta>
        </Flex>
      </Card>
    )
  }
  
  export default KpiCard
  