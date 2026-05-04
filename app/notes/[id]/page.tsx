import NoteDetailsClient from "./NoteDetails.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const note = await fetchNoteById(id);

  const title = `${note.title} — NoteHub`;
  const description =
    note.content.length > 30 ? note.content.slice(0, 27) + "..." : note.content;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-nextjs-project.vercel.app/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: Props) {
  const queryClient = new QueryClient();

  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
