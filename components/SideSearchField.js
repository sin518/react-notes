"use client";

import { usePathname, useRouter } from "next/navigation";
import { use, useTransition } from "react";
import { useTranslations } from "use-intl";

function Spinner({ active = true }) {
  return (
    <div
      className={["spinner", active && "spinner--active"].join(" ")}
      role="progressbar"
      aria-busy={active ? "true" : "false"}
    />
  );
}

export default function SidebarSearchField() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Basic");

  function handleSearch(term) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="search" role="search">
      <label className="offscreen" htmlFor="sidebar-search-input">
        Search for a note by title
      </label>
      <input
        id="sidebar-search-input"
        placeholder={t("search")}
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Spinner active={isPending} />
    </div>
  );
}
