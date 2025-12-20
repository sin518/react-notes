import dayjs from "dayjs";
import NotePreview from "@/components/NotePreview";
import EditButton from "@/components/EditButton";

function Note({ noteId, note }) {
  const { title, content, updateTime } = note;
  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu" role="menubar">
          <small className="note-update-at" role="status">
            Last updated on {dayjs(updateTime).format("YYYY-MM-DD HH:mm")}
          </small>
          <EditButton noteId={noteId}>Edit</EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  );
}

export default Note;
