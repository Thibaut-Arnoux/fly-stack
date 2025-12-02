import { useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import {
  type ParsedSearch,
  parseCommaSeparatedEnum,
  parseRange,
  toColumnFiltersState,
  toSortingState,
} from '@/components/ui/tables/utils/search';
import { ItemCategoryEnumList } from '@/enums/item-category-enum';
import { ItemRarityEnumList } from '@/enums/item-rarity-enum';
import { ItemSubcategoryEnumList } from '@/enums/item-subcategory-enum';
import type { SearchParams } from '@/schemas/search-schema';
import { ITEM_CONSTANTS, ITEM_SORT_FIELDS } from '@/utils/constants';

/**
 * Parse raw search params into typed, validated format
 * @param params - Raw search parameters
 * @returns Parsed search parameters with filters and sorts states compatible with TanStack Table
 */
const parseItemSearchParams = (params: SearchParams): ParsedSearch => {
  const parsedFilters = {
    name: params.name ? { id: 'name', value: params.name } : undefined,
    category: parseCommaSeparatedEnum(
      'category',
      params.category,
      ItemCategoryEnumList,
    ),
    subcategory: parseCommaSeparatedEnum(
      'subcategory',
      params.subcategory,
      ItemSubcategoryEnumList,
    ),
    rarity: parseCommaSeparatedEnum(
      'rarity',
      params.rarity,
      ItemRarityEnumList,
    ),
    level: parseRange('level', params.level, {
      minValue: ITEM_CONSTANTS.LEVEL.MIN,
      maxValue: ITEM_CONSTANTS.LEVEL.MAX,
    }),
  };

  return {
    sorts: toSortingState(params.sort, ITEM_SORT_FIELDS, {
      id: 'level',
      desc: false,
    }),
    filters: toColumnFiltersState(parsedFilters),
  };
};

export const useItemSearch = (): ParsedSearch => {
  const search = useSearch({ from: '/items' });

  return useMemo(() => parseItemSearchParams(search), [search]);
};
