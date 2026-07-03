import { supabase } from "./supabase";

export async function getArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get Articles Error:", error);
    return [];
  }

  return data;
}

export async function createArticle(article: {
  headline: string;
  summary: string;
  category: string;
  image_url: string;
  author: string;
  featured: boolean;
  published: boolean;
  content: string;
  slug: string;
}) {
  const { data, error } = await supabase
    .from("articles")
    .insert([article]);

  if (error) {
    throw error;
  }

  return data;
}

export async function getArticleById(id: number) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Get Article Error:", error);
    return null;
  }

  return data;
}