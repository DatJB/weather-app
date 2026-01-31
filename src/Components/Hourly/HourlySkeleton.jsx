import Skeleton from "../common/Skeleton";

const HourlySkeleton = () => {
    return (
        <div className="space-y-2 mt-4">
        {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="w-75 h-12 ml-4.5" />
        ))}
        </div>
    )
};

export default HourlySkeleton;