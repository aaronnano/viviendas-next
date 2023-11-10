import { usePathname, useSearchParams } from "next/navigation";
import queryString from 'query-string'
import { useMemo } from "react";

const useQueryParams = () => {
  const pathname = usePathname()
  const res = useSearchParams()
  // const searchParams = new URLSearchParams(res?.toString())
  const searchParams: any = queryString.parse(res?.toString() || '', { arrayFormat: 'comma', parseNumbers: true })

  //Hardcoded
  if(searchParams.serviciosSelected?.[1] === '') searchParams.serviciosSelected.pop()
  

  return {
    searchParams,
    pathname
  }
};
  
  export default useQueryParams;