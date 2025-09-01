import { electricCollectionOptions } from '@tanstack/electric-db-collection';
import { QueryClient } from '@tanstack/query-core';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import { createCollection, useLiveQuery } from '@tanstack/react-db';
import { createFileRoute } from '@tanstack/react-router';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import z from 'zod';
import { HttpClient } from '@/api/http-client';

const httpClient = new HttpClient({
  baseUrl: 'http://localhost:8000',
});

const userSchema = z.object({
  id: z.number().positive().int(),
  name: z.string(),
});

type User = z.infer<typeof userSchema>;

const userCollection = createCollection(
  electricCollectionOptions<User>({
    id: 'users',
    shapeOptions: {
      url: 'http://localhost:8000/api/v1/shape/users',
      params: {
        columns: ['id', 'name'],
      },
      fetchClient: httpClient.asFetch,
    },
    getKey: (item) => item.id,
  }),
);

// const queryClient = new QueryClient()

// const userCollection = createCollection(
//   queryCollectionOptions<User>({
//     queryClient,
//     queryKey: ['todos'],
//     queryFn: async () => {
//       const response = await fetch('http://localhost:8000/api/users')
//       return response.json()
//     },
//     getKey: (item) => item.id,
//   }),
// );

export const Route = createFileRoute('/users')({
  loader: () => userCollection.preload(),
  component: Users,
});

function Users() {
  const { data: users } = useLiveQuery((q) => q.from({ user: userCollection }));
  // The scrollable element for your list
  const parentRef = useRef(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: users.length,
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
              {users[virtualItem.index].name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
