import { NextRequest, NextResponse } from "next/server";
import { BigQuery } from "@google-cloud/bigquery";

const BIGQUERY_PROJECT_ID = "labs-429612";
const BIGQUERY_DATASET_ID = "ecommerce_products";
const BIGQUERY_TABLE_ID = "carrefour_diaper_simple_view";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const product = url.searchParams.get("product") || "MOLFIX";
  
    const bigquery = new BigQuery({
      projectId: BIGQUERY_PROJECT_ID,
    });
    const query = `SELECT * FROM ${BIGQUERY_DATASET_ID}.${BIGQUERY_TABLE_ID}`;
  
    const [rows] = await bigquery.query(query);
  
    return NextResponse.json({
      products: rows,
    });
  }