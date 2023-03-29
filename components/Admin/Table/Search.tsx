import React, { ChangeEvent } from 'react';
import { useRouter } from 'next/router';

const Search = () => {
  const router = useRouter();
  const { limit } = router.query;

  let debounceTimer: ReturnType<typeof setTimeout>;
  const debounceTime = 500;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const search = e.target.value;
      router.push({ query: { limit, search } });
    }, debounceTime);
  };

  return (
    <>
      <p>Search</p>
      <input
        onChange={onChange}
        className="border rounded py-1 px-2 outline-none"
      />
    </>
  );
};

export default Search;
