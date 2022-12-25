import qs from "qs";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Adapted code from https://www.inkoop.io/blog/syncing-query-parameters-with-react-state/
export default function useQueryState<T extends string>(
    label: string,
    query: T,
): [T, (value: T) => void] {
    const location = useLocation();
    const navigate = useNavigate();

    const setQuery = useCallback(
        (value: T) => {
            const existingQueries = qs.parse(location.search, {
                ignoreQueryPrefix: true,
            });

            const queryString = qs.stringify(
                { ...existingQueries, [label]: value },
                { skipNulls: true },
            );

            navigate(`${location.pathname}?${queryString}`);
        },
        [label, location.pathname, location.search, navigate],
    );

    const value = qs.parse(location.search, { ignoreQueryPrefix: true })[label] as T;
    return [value || query, setQuery];
}
