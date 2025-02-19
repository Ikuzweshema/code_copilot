import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function useSearch<T>(
  items: T[],
  options: {
    predicate: (item: T, query: string) => boolean;
    debounce?: number;
    searchParams?: string;
  }
) {
  const params = useSearchParams();
  const [filtered, setFiltered] = useState(items);
  const [query, setQuery] = useState(() => {
    return params.get(options?.searchParams || "query") || "";
  });
  const pathname = usePathname();
  const router = useRouter();
  const search = useDebouncedCallback(() => {
    const searchParams = new URLSearchParams(params);
    if (query.trim() === "") {
      searchParams.delete("query");
      setFiltered(items);
      router.replace(`${pathname}`);
      return;
    }
    const newItems: T[] = [];
    for (const item of items) {
      if (options.predicate(item, query.toLocaleLowerCase())) {
        newItems.push(item);
      }
    }
    setFiltered(newItems);
    searchParams.set(options?.searchParams || "query", query);
    router.replace(`${pathname}?${searchParams.toString()}`);
  }, options?.debounce || 200);

  useEffect(() => {
    search();
  }, [query, search]);

  return [query, setQuery, filtered] as const;
}

export default useSearch;
