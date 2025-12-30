import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import NoteListSkeleton from "@/components/NoteListSkeleton";
import SidebarNoteList from "@/components/SidebarNoteList";
import EditButton from "@/components/EditButton";
import SideSearchField from "@/components/SideSearchField";
import { getTranslations, getMessages } from "next-intl/server";

export default async function Sidebar({ locale }) {
  let t;
  let messages;
  try {
    t = await getTranslations({ locale, namespace: "Basic" });
    messages = await getMessages({ locale });
  } catch (err) {
    t = (key) => key;
    messages = {};
    console.error("Sidebar: failed to load translations:", err);
  }
  return (
    <>
      <section className="col sidebar">
        <Link href={"/"} className="link--unstyled">
          <section className="sidebar-header">
            <Image
              className="logo"
              src="/logo.svg"
              width={22}
              height={20}
              alt=""
              role="presentation"
            />
            <strong>Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SideSearchField />
          <EditButton noteId={null}>{t("new")}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  );
}
