import { createFileRoute } from '@tanstack/react-router';
import {
  classesQueryOptions,
  useClassesQuery,
} from '@/hooks/flyff-service/use-classes-query';

export const Route = createFileRoute('/classes')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(classesQueryOptions);
  },
  component: Classes,
});

function Classes() {
  const { data: classes } = useClassesQuery();

  return (
    <div className="p-2">
      <h3>Classes</h3>
      {classes.map((c) => (
        <div key={c.id}>
          <h4>{c.name.en}</h4>
        </div>
      ))}
    </div>
  );
}
