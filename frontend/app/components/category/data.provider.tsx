import { Category } from "@/lib/types/category";
import { PropsWithChildren, createContext, useContext } from "react";

const CategoryContext = createContext<Category[] | null>(null);

type Props = PropsWithChildren<{
  data: Category[];
}>;

const CategoryDataProvider = ({ data, children }: Props) => {
  return (
    <CategoryContext.Provider value={data}>{children}</CategoryContext.Provider>
  );
};

const useCategoryData = () => {
  const data = useContext(CategoryContext);

  return data;
};

export { CategoryDataProvider, useCategoryData };
