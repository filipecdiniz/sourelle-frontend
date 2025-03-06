import { ConsumeProductAPI } from "@/backEndRoutes";

export default async function getProducts(categoryId?: number) {
  try {
    const response = await fetch(`${ConsumeProductAPI}`);
    const data = await response.json();
  } catch (error) {}
}
