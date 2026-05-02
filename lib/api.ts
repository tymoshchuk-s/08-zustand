import axios from "axios";
import { FormValues, Note } from "../types/note";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN!;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

const formatTag = (tag: string) => {
  if (!tag || tag === "all") return "";
  return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
};


export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<NotesHttpResponse> => {
  const params: Record<string, string | number> = {
    page,
  };

  if (search) {
    params.search = search;
  }

  const apiTag = formatTag(tag ?? "all");

  if (apiTag) {
    params.tag = apiTag;
  }

  const { data } = await axios.get<NotesHttpResponse>(
    `${BASE_URL}/notes`,
    {
      headers,
      params,
    }
  );

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`${BASE_URL}/notes/${id}`, {
    headers,
  });

  return response.data;
};

export const createNote = async (note: FormValues): Promise<Note> => {
  const response = await axios.post<Note>(`${BASE_URL}/notes`, note, {
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers,
  });
  return response.data;
};