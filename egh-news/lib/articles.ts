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
export async function getFeaturedArticle() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("featured", true)
    .limit(1)
    .single();

  if (!error && data) {
    return data;
  }

  // Fallback: latest published article
  const { data: latest } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return latest;
}
export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Get Article By Slug Error:", error);
    return null;
  }

  return data;
}
export async function searchArticles(searchTerm: string) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .or(`headline.ilike.%${searchTerm}%,summary.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Search Error:", error);
    return [];
  }

  return data;
}
export async function getArticlesByCategory(category: string) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("category", category)
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Category Error:", error);
    return [];
  }

  return data;
}
export async function deleteArticle(id: number) {
  const { error } = await supabase
    .from("articles")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}