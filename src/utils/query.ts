import { ApiService } from '@/api/api-service';
import type { SearchOptions, SearchPaginatedOptions } from '@/types/api';

export const getQueryKey = (module: string, params: SearchOptions) => {
  const key: unknown[] = [module];

  if (params.properties) {
    let propertyKeys: Record<string, string> = {};
    for (const property of params.properties) {
      propertyKeys = { ...propertyKeys, [property.field]: property.value };
    }
    if (Object.keys(propertyKeys).length)
      key.push({ properties: propertyKeys });
  }

  if (params.sorts) {
    let sortKeys: Record<string, string> = {};
    for (const sort of params.sorts) {
      sortKeys = {
        ...sortKeys,
        [sort.field]: sort.order ?? ApiService.SEARCH_PARAMS._ORDER,
      };
    }
    if (Object.keys(sortKeys).length) key.push({ sorts: sortKeys });
  }

  if (params.likes) {
    let likeKeys: Record<string, string> = {};
    for (const like of params.likes) {
      // avoid default string like '' to be added as key (e.g default search value)
      if (like.value) {
        likeKeys = { ...likeKeys, [like.field]: like.value };
      }
    }
    if (Object.keys(likeKeys).length) key.push({ likes: likeKeys });
  }

  return key;
};

export const getPaginatedQueryKey = (
  module: string,
  params: SearchPaginatedOptions,
) => {
  const key: unknown[] = getQueryKey(module, params);

  key.push({ page: params.page });

  if (params.perPage) {
    key.push({ perPage: params.perPage });
  }

  return key;
};
