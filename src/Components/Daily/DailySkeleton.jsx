import Skeleton from "../common/Skeleton";

const DailySkeleton = () => {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 mt-3">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="w-23 sm:w-20 h-30" />
          ))}
        </div>
    )
};

export default DailySkeleton;