import { useAllCategoriesQuery } from "@/lib/queries/category";
import { Category } from "./category";
import { CategoryDataProvider } from "./data.provider";

const Categories = () => {
  const { isLoading, data } = useAllCategoriesQuery();

  if (isLoading) return <div>categories are loading...</div>;

  if (!data?.success) return <div>there was an error.</div>;

  const firstLevelCategories = data.data.filter((i) => i.parent_id === null);

  return (
    <CategoryDataProvider data={data.data}>
      <div>
        {firstLevelCategories.map((category) => (
          <div key={category.id}>
            <Category category={category} />
          </div>
        ))}
      </div>
    </CategoryDataProvider>
  );
};

export { Categories };
