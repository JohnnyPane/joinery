import { Skeleton } from "@mantine/core";

const ProductSkeletons = ({ count = 6 }) => {
  return (
    <div className="product-grid">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="">
          <Skeleton height={300} mb="sm" />
          <Skeleton height={20} mb="xs" />
          <Skeleton height={20} width="60%" />
        </div>
      ))}
    </div>
  );
}

export default ProductSkeletons;