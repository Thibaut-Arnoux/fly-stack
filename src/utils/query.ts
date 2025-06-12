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
    for (const [index, sort] of params.sorts.entries()) {
      sortKeys = {
        ...sortKeys,
        // add index because order is important in multiple sorts (e.g level,subcategoy !== subcategory,level)
        [`${sort.field}_${index}`]:
          sort.order ?? ApiService.SEARCH_PARAMS._ORDER,
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

  key.push({ perPage: params.perPage ?? ApiService.SEARCH_PARAMS._PER_PAGE });

  return key;
};
