"use client"
import { useState } from "react"

import {
  BadgeDelta,
  Card,
  // DeltaType,
  MultiSelect,
  MultiSelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react"
import { useGetProducts } from "@/data/products"

export const salesPeople: SalesPerson[] = [
  {
    name: "Peter Doe",
    leads: 45,
    sales: "1,000,000",
    quota: "1,200,000",
    variance: "low",
    region: "Region A",
    status: "overperforming",
    deltaType: "moderateIncrease",
  },
  {
    name: "Lena Whitehouse",
    leads: 35,
    sales: "900,000",
    quota: "1,000,000",
    variance: "low",
    region: "Region B",
    status: "average",
    deltaType: "unchanged",
  },
  {
    name: "Phil Less",
    leads: 52,
    sales: "930,000",
    quota: "1,000,000",
    variance: "medium",
    region: "Region C",
    status: "underperforming",
    deltaType: "moderateDecrease",
  },
  {
    name: "John Camper",
    leads: 22,
    sales: "390,000",
    quota: "250,000",
    variance: "low",
    region: "Region A",
    status: "overperforming",
    deltaType: "increase",
  },
  {
    name: "Max Balmoore",
    leads: 49,
    sales: "860,000",
    quota: "750,000",
    variance: "low",
    region: "Region B",
    status: "overperforming",
    deltaType: "increase",
  },
  {
    name: "Peter Moore",
    leads: 82,
    sales: "1,460,000",
    quota: "1,500,000",
    variance: "low",
    region: "Region A",
    status: "average",
    deltaType: "unchanged",
  },
  {
    name: "Joe Sachs",
    leads: 49,
    sales: "1,230,000",
    quota: "1,800,000",
    variance: "medium",
    region: "Region B",
    status: "underperforming",
    deltaType: "moderateDecrease",
  },
]

export type SalesPerson = {
  name: string
  leads: number
  sales: string
  quota: string
  variance: string
  region: string
  status: string
  deltaType: string
}

interface Props {
  salesPeople: SalesPerson[]
}

const TableView = () => {
  const { data, error, isLoading } = useGetProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;


  return (
    <Card>

      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Product ID</TableHeaderCell>
            <TableHeaderCell className="text-right">Brand</TableHeaderCell>
            <TableHeaderCell className="text-right">Product Name</TableHeaderCell>
            <TableHeaderCell className="text-right">Units</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.products.map((item:any) => (
              <TableRow key={item.product_id}>
                <TableCell>{item.product_id}</TableCell>
                <TableCell className="text-right">{item.brand}</TableCell>
                <TableCell className="text-right">{item.product_name}</TableCell>
                <TableCell className="text-right">{item.units}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  )
}

export default TableView
