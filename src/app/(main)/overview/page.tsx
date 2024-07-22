"use client"
import { useState } from "react"

import { Card, Grid, Tab, TabList, Text, Title } from "@tremor/react"
import { cx } from "@/lib/utils"
import KpiCard from "@/components/ui/KpiCard/KpiCard"
import ChartCard from "@/components/ui/overview/DashboardChartCard"

const kpis = [
  {
    title: "Sales",
    metric: "1,200,000",
  },
  {
    title: "Leads",
    metric: "45",
  },
  {
    title: "Conversion Rate",
    metric: "12%",
  },
]

const DashboardPage = () => {
  return (
    <>
      <main className="bg-slate-50 p-6 sm:p-10">
        <Title>Dashboard</Title>
        <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.title} kpi={kpi} />
          ))}
        </div>

        <div className="mt-6">
          <dl
            className={cx(
              "mt-10 grid grid-cols-1 gap-14 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4",
            )}
          >
            <Card className="mx-auto my-auto md:col-span-2 xl:col-span-3">
              <ChartCard />
            </Card>

            <Card>
              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
                Usage
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                hi
              </div>
            </Card>
          </dl>
        </div>
      </main>
    </>
  )
}

export default DashboardPage
