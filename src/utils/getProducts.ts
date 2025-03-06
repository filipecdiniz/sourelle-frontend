import { ConsumeProductAPI } from "@/backEndRoutes";

export default async function getProducts(categoryId?: number) {
  try {
    const response = await fetch(`${ConsumeProductAPI}/${categoryId ? `?categoryId=${categoryId}` : ""}`);
    console.log(response)
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    return;
  }
}
