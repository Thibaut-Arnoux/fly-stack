import { memo, useMemo } from 'react';
import { Badge } from '@/components/ui/data-display/badge';
import { Section } from '@/components/ui/layouts/section';
import type { Item } from '@/schemas/item-schema';

interface ItemDetailsClassificationProps {
  item: Item;
}

export const ItemDetailsClassification = memo(
  ({ item }: ItemDetailsClassificationProps) => {
    const fields = useMemo(
      () =>
        [
          { label: 'Category', value: item.category },
          { label: 'Subcategory', value: item.subcategory },
          { label: 'Sex', value: item.sex },
          { label: 'Class', value: item.class ? `Class ${item.class}` : null },
        ].filter((field) => field.value),
      [item.category, item.subcategory, item.sex, item.class],
    );

    return (
      <Section title="Classification">
        <div className="flex flex-wrap gap-4 text-sm">
          {fields.map((field) => (
            <ItemDetailsClassificationField
              key={field.label}
              label={field.label}
              value={field.value as string}
            />
          ))}
        </div>
      </Section>
    );
  },
);

ItemDetailsClassification.displayName = 'ItemDetailsClassification';

interface ClassificationFieldProps {
  label: string;
  value: string;
}

const ItemDetailsClassificationField = memo(
  ({ label, value }: ClassificationFieldProps) => {
    return (
      <div className="flex items-center gap-2">
        <span className="text-base-content/50 font-medium">{label}</span>
        <Badge variant="ghost" className="rounded">
          <span className="text-base-content font-semibold">{value}</span>
        </Badge>
      </div>
    );
  },
);

ItemDetailsClassificationField.displayName = 'ItemDetailsClassificationField';
