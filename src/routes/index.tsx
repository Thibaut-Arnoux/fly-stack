import { useClassData } from '@/hooks/flyff-service/use-class-data';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) => {
    const { classesQueryOptions } = useClassData();
    queryClient.ensureQueryData(classesQueryOptions);
  },
  component: Index,
});

function Index() {
  const { classesQueryOptions } = useClassData();
  const classesQuery = useSuspenseQuery(classesQueryOptions);
  const classes = classesQuery.data;

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {classes.map((c) => (
        <div key={c.id}>
          <h4>{c.name.en}</h4>
        </div>
      ))}
    </div>
  );
}
