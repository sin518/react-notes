import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import NoteListSkeleton from "@/components/NoteListSkeleton";
import SidebarNoteList from "@/components/SidebarNoteList";
import EditButton from "@/components/EditButton";
import SideSearchField from "@/components/SideSearchField";

export default async function Sidebar() {
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
          <EditButton noteId={null}>New</EditButton>
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
