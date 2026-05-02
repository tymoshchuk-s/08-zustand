import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";


type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const tagFromUrl = slug[0]?.toLowerCase() || "all";

  const queryClient = new QueryClient();

 await queryClient.prefetchQuery({
  queryKey: ["notes", "", 1, tagFromUrl],
  queryFn: () => fetchNotes("", 1, tagFromUrl),
});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tagFromUrl} />
    </HydrationBoundary>
  );
}