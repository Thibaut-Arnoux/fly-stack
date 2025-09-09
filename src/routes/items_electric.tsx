import { electricCollectionOptions } from '@tanstack/electric-db-collection';
import { createCollection, useLiveQuery } from '@tanstack/react-db';
import { createFileRoute } from '@tanstack/react-router';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { HttpClient } from '@/api/http-client';
import type { ItemElectric } from '@/schemas/item';

const httpClient = new HttpClient({
  baseUrl: 'http://localhost:8000',
});

const itemCollection = createCollection(
  electricCollectionOptions<ItemElectric>({
    id: 'items',
    shapeOptions: {
      url: 'http://localhost:8000/api/v1/shape/items',
      fetchClient: httpClient.asFetch,
    },
    getKey: (item) => item.id,
  }),
);

export const Route = createFileRoute('/items_electric')({
  loader: () => itemCollection.preload(),
  component: Users,
});

function Users() {
  const { data: items } = useLiveQuery((q) => q.from({ item: itemCollection }));
  // The scrollable element for your list
  const parentRef = useRef(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 25,
  });

  return (
    <div className="p-2">
      <h3>Users</h3>
      {/* The scrollable element for your list */}
      <div
        ref={parentRef}
        style={{
          height: `400px`,
          overflow: 'auto', // Make it scroll!
        }}
      >
        {/* The large inner element to hold all of the items */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {items[virtualItem.index].name.en}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
