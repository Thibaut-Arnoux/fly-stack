import { Store } from '@tanstack/react-store';

export const upsert = <T, S extends Record<K, T[]>, K extends keyof S>(
  store: Store<S>,
  key: K,
  value: T,
  matchFn: (existingItem: T) => boolean,
) => {
  const list = store.state[key];
  const index = list.findIndex(matchFn);

  const updated =
    index !== -1
      ? list.map((v, i) => (i === index ? value : v))
      : [...list, value];

  store.setState({ ...store.state, [key]: updated });
};
