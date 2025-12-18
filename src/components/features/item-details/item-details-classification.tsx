import { Badge } from '@/components/ui/data-display/badge';
import { Section } from '@/components/ui/layouts/section';
import type { Item } from '@/schemas/item-schema';

interface ItemDetailsClassificationProps {
  item: Item;
}

export const ItemDetailsClassification = ({
  item,
}: ItemDetailsClassificationProps) => {
  const fields = [
    { label: 'Category', value: item.category },
    { label: 'Subcategory', value: item.subcategory },
    { label: 'Sex', value: item.sex },
  ];

  return (
    <Section title="Classification">
      <div className="flex flex-wrap gap-4 text-sm">
        {fields.map(
          (field) =>
            field.value && (
              <ItemDetailsClassificationField
                key={field.label}
                label={field.label}
                value={field.value}
              />
            ),
        )}
      </div>
    </Section>
  );
};

const ItemDetailsClassificationField = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div key={label} className="flex items-center gap-2">
      <span className="text-base-content/50 font-medium">{label}</span>
      <Badge variant="ghost" className="rounded">
        <span className="text-base-content font-semibold">{value}</span>
      </Badge>
    </div>
  );
};
