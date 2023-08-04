import { number, object, string } from 'yup'

const payload = {
    body: object({
        title: string().required("title is required"),
        id: string().required("id is required"),
        author: string().required("author is required"),
        publishedYear: number().required("publishedYear is required")
    }),
  };
  
  const params = {
    params: object({
      id: string().required("id is required"),
    }),
  };
  
  export const createBookSchema = object({
    ...payload,
  });
  
  export const updateBookSchema = object({
    ...params,
    ...payload,
  });
  
  export const deleteBookSchema = object({
    ...params,
  });