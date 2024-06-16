import { Categories } from "./category/categories";

const Sidebar = () => {
  return (
    <div className="[&>*]:py-2.5 [&>*]:px-5 border-r border-light-900 border-opacity-20">
      <h1 className="border-b border-light-900 border-opacity-20">Category</h1>
      <Categories />
    </div>
  );
};

export { Sidebar };
