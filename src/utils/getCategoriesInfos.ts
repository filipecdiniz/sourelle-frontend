export async function getCategoriesInfos(categoryName?: string) {
  try {

    const response = await fetch(`https://api.sourelle.site/category/${categoryName ? `?categoryName=${categoryName}` : ""}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidHlwZVVzZXIiOjEsImlhdCI6MTczOTk3NzE0NywiZXhwIjoxNzQwNTgxOTQ3fQ.m3C2RP0ezzjFjP6F35k8_i6IYWd_Gxuqq1TzPzOryMo'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}