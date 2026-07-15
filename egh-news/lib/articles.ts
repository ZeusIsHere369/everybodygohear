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

export async function saveGalleryImages(
  articleId: number,
  images: {
    image_url: string;
    caption?: string;
  }[]
) {
  if (images.length === 0) return;

  const rows = images.map((image, index) => ({
    article_id: articleId,
    image_url: image.image_url,
    caption: image.caption ?? "",
    sort_order: index,
  }));

  const { error } = await supabase
    .from("article_images")
    .insert(rows);

  if (error) {
    throw error;
  }
}

export async function getGalleryImages(articleId: number) {
  const { data, error } = await supabase
    .from("article_images")
    .select("*")
    .eq("article_id", articleId)
    .order("sort_order");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function createArticle(article: {
  headline: string;
  summary: string;
  category: string;
  image_url: string;
  video_url: string;
  author: string;
  featured: boolean;
  published: boolean;
  content: string;
  slug: string;
}) {
  const { data, error } = await supabase
    .from("articles")
    .insert([article])
    .select()
    .single();

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
    .maybeSingle();

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
    .maybeSingle();

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
    .maybeSingle();

  return latest;
}
export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

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
    .or(
      `headline.ilike.%${searchTerm}%,summary.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`
    )
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
export async function updateArticle(
  id: number,
  article: {
    headline: string;
    summary: string;
    content: string;
    category: string;
    image_url: string;
    author: string;
    featured: boolean;
    published: boolean;
    slug: string;
  }
) {
  const { data, error } = await supabase
    .from("articles")
    .update(article)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
export async function getRelatedArticles(
  currentSlug: string,
  limit = 3
) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .neq("slug", currentSlug)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Related Articles Error:", error);
    return [];
  }

  return data;
}