import { useState, useCallback } from "react";

export default function useResourceController(initial = {}) {
  const [page, setPage] = useState(initial.page || 1);
  const [perPage, setPerPage] = useState(initial.perPage || 10);
  const [sortColumn, setSortColumn] = useState(initial.sortColumn || 'id');
  const [sortDirection, setSortDirection] = useState(initial.sortDirection || 'desc');
  const [filters, setFilters] = useState(initial.filters || {});
  const [scopes, setScopes] = useState(initial.scopes || []);
  const [search, setSearch] = useState(initial.search || '');

  const reset = useCallback(() => {
    setPage(1);
    setPerPage(10);
    setSortColumn('id');
    setSortDirection('desc');
    setFilters({});
    setScopes([]);
    setSearch('');
  }, []);

  return {
    page, setPage,
    perPage, setPerPage,
    sortColumn, setSortColumn,
    sortDirection, setSortDirection,
    filters, setFilters,
    scopes, setScopes,
    search, setSearch,
    reset
  }
}