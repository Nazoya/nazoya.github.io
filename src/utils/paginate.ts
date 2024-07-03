type IPaginateOption = { pageSize?: number; paramName?: string; path?: string; } | undefined;
type IRoute<T> = {
  params: Record<string, string>;
  props: {
    data: T[];
    start: number;
    end: number;
    size: number;
    total: number;
    currentPage: number;
    lastPage: number;
    url: {
      current: string;
      next: string | undefined;
      prev: string | undefined;
    }
  }
}

function paginate<T>(collection: T[], { paramName = 'page', pageSize = 10, path = '', }: IPaginateOption = {}) {
  if (!paramName) {
    throw new Error('paramName should not be empty or Nullish!');
  }
  const routes: IRoute<T>[] = [];
  const lastPage = Math.ceil(collection.length / pageSize);
  for (let page = 1, start = 0; start < collection.length; page += 1) {
    const collectionSlice = collection.slice(start, start += pageSize);
    routes.push({
      params: { [paramName]: String(page), },
      props: {
        data: collectionSlice,
        start,
        end: start + collectionSlice.length,
        size: pageSize,
        total: collection.length,
        currentPage: page,
        lastPage,
        url: {
          current: `${path ? `${path}/` : ''}${paramName}/${page}`,
          next: page <= page ? `${path ? `${path}/` : ''}${paramName}/${page + 1}` : undefined,
          prev: page > 0 ? `${path ? `${path}/` : ''}/${paramName}/${page}` : undefined,
        }
      }
    } satisfies IRoute<T>);
  }

  return routes;
}



export { paginate };