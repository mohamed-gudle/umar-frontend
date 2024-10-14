import { fetcher } from "@/lib/axios";
import axios from "axios";
import { useMemo } from "react";
import useSWR from "swr";



export function getUserToken(url : string, {arg}:{arg:string[]}){
  

}

export function useGetCategoryPage(){
    const { data, isLoading, error } = useSWR("/api/category", fetcher);

    return useMemo(() => {
        return {
          data,
          isLoading,
          error,
        }
      }, [data, isLoading, error])

}

export function useGetBrandPage(){
    const { data, isLoading, error } = useSWR("/api/brand", fetcher);

    return useMemo(() => {
        return {
          data,
          isLoading,
          error,
        }
      }, [data, isLoading, error])

}

export async function getPriceHistory(url : string, {arg}:{arg:string[]})  {

    const  response= await axios.post('/api/price-history', {products:arg});

    return response.data;
}

export function useGetDataPage(){
    const { data, isLoading, error } = useSWR("/api/data-table", fetcher);

    return useMemo(() => {
        return {
          data,
          isLoading,
          error,
        }
      }, [data, isLoading, error])
}

