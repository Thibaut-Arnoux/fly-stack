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
import {
  ITEM_CONSTANTS,
  ITEM_FILTER_FIELDS,
  ITEM_SORT_FIELDS,
} from '@/utils/constants';

const parseItemSearchParams = (params: SearchParams): ParsedSearch => {
  const parsedFilters = ITEM_FILTER_FIELDS.map((id) => {
    switch (id) {
      case 'name':
        return params.name ? { id, value: params.name } : undefined;
      case 'category':
        return parseCommaSeparatedEnum(
          id,
          params.category,
          ItemCategoryEnumList,
        );
      case 'subcategory':
        return parseCommaSeparatedEnum(
          id,
          params.subcategory,
          ItemSubcategoryEnumList,
        );
      case 'rarity':
        return parseCommaSeparatedEnum(id, params.rarity, ItemRarityEnumList);
      case 'level':
        return parseRange(id, params.level, {
          minValue: ITEM_CONSTANTS.LEVEL.MIN,
          maxValue: ITEM_CONSTANTS.LEVEL.MAX,
        });
      default:
        return undefined;
    }
  });

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
