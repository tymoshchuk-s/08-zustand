import type { Metadata } from "next";
import NotFoundUseClient from "./not-found-use-client";

export const metadata: Metadata = {
  title: "404 - Page not found — NoteHub",
  description:
    "The page you are looking for does not exist on NoteHub. Please check the URL or return to the homepage.",
  openGraph: {
    title: "404 - Page not found — NoteHub",
    description:
      "The page you are trying to access could not be found on NoteHub. Navigate back to explore available notes and features.",
    url: "https://08-zustand-nextjs-project.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — Page Not Found",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <div>
        <h1>404 - Page not found — NoteHub</h1>
        <p>The page you are looking for does not exist on NoteHub.</p>
        <NotFoundUseClient />
      </div>
    </div>
  );
};

export default NotFound;