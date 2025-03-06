export async function getBackProducts(categoryId?: number) {
  try {

    const response = await fetch(`http://localhost:3000/product/${categoryId ? `?categoryId=${categoryId}` : ""}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidHlwZVVzZXIiOjEsImlhdCI6MTczOTk3NzE0NywiZXhwIjoxNzQwNTgxOTQ3fQ.m3C2RP0ezzjFjP6F35k8_i6IYWd_Gxuqq1TzPzOryMo'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return;
  }
}