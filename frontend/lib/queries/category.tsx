import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Result } from "../types/utils";
import { Category } from "../types/category";
import { BACKEND_URL } from "./constants";

const useAllCategoriesQuery = () => {
  return useQuery({
    queryKey: ["all-categories"],
    queryFn: async () => {
      const result = await axios.get(`${BACKEND_URL}/category`);
      return result.data as Result<Category[]>;
    },
  });
};

export { useAllCategoriesQuery };
