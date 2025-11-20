import { useSearchParams, useRouter, usePathname } from "next/navigation";

function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getParam = (key: string, defaultValue?: string) => {
    return searchParams.get(key) || defaultValue || "";
  };

  const getNumberParam = (key: string, defaultValue: number = 0) => {
    const value = searchParams.get(key);
    return value ? parseInt(value, 10) : defaultValue;
  };

  const setParam = (key: string, value: string | number | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null || value === "" || value === undefined) {
      params.delete(key);
    } else {
      params.set(key, value.toString());
    }

    const query: Record<string, string> = {};
    params.forEach((value, key) => {
      query[key] = value;
    });

    router.replace(`${pathname}?${new URLSearchParams(query).toString()}`, {
      scroll: false,
    });
  };

  const setParams = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });

    const query: Record<string, string> = {};
    params.forEach((value, key) => {
      query[key] = value;
    });

    router.replace(`${pathname}?${new URLSearchParams(query).toString()}`, {
      scroll: false,
    });
  };

  return {
    getParam,
    getNumberParam,
    setParam,
    setParams,
    searchParams,
  };
}

export default useQueryParams;
