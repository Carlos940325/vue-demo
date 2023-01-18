import { serve } from "./service";

// 文章 list
export async function getArticle() {
  return serve.get("http://jsonplaceholder.typicode.com/posts", {
  });
}

// 文章 ID查询
export async function getArticleById(params){
    return serve.get(`http://jsonplaceholder.typicode.com/posts/${params}`)
}