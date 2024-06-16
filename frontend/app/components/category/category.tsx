import { Category as TCategory } from "@/lib/types/category";
import { useCategoryData } from "./data.provider";

type Props = {
  category: TCategory;
};

const Category = (props: Props) => {
  const categoryData = useCategoryData();

  const subs = categoryData?.filter((i) => i.parent_id === props.category.id);

  return (
    <div>
      <p className="py-0.5 hover:bg-dark-800 cursor-pointer">
        {props.category.name}
      </p>
      {subs && subs.length ? (
        <div className="pl-3">
          {subs.map((sub) => (
            <Category key={sub.id} category={sub} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export { Category };
