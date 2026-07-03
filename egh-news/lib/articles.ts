import { supabase } from "./supabase";

export async function getArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function createArticle(article: {
  title: string;
  summary: string;
  category: string;
  image: string;
  author: string;
  featured: boolean;
}) {
  const { data, error } = await supabase
    .from("articles")
    .insert([article]);

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}