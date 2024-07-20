import { useNavigate, useSearchParams } from "@remix-run/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { formatQuery } from "~/lib/formatQuery";
import { Input } from "~/shared/ui";

export const SneakerSearchInput = () => {
  const searchParams = useSearchParams()[0];
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const formattedQuery = formatQuery(searchQuery);
    event.preventDefault();
    navigate(`/sneakers/search?q=${formattedQuery}`);
  };

  useEffect(() => {
    const query = formatQuery(searchParams.get("q") || "");
    setSearchQuery(query);
  }, [searchParams]);

  return (
    <form onSubmit={onSubmit}>
      <Input
        defaultValue={searchParams.get("q") || ""}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search.."
        name="q"
      />
    </form>
  );
};
