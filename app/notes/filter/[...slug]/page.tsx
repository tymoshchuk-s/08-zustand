import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tagFromUrl = slug[0] || "All";

  const title = `Notes filtered by: ${tagFromUrl} — NoteHub`;
  const description = `Browse your notes filtered by "${tagFromUrl}" in NoteHub. Quickly find the ideas and tasks you need.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-nextjs-project.vercel.app/notes/filter/${tagFromUrl}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes filtered by ${tagFromUrl}`,
        },
      ],
    },
  };
}

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const tagFromUrl = slug[0] === "All" ? "" : slug[0];
  const initialData = await fetchNotes("", 1, tagFromUrl);

  return (
    <NotesClient
      initialNotes={initialData.notes}
      initialTotalPages={initialData.totalPages}
      tag={tagFromUrl}
    />
  );
}