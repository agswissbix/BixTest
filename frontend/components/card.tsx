export default function CardComp() {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
            <div className="flex items-center justify-between">
                <span className="text-sm/6 font-medium text-gray-900 dark:text-white">
                    Apple MacBook Pro 17"
                </span>
                <span className="text-xs/6 font-semibold text-gray-900 dark:text-white">
                    $2999
                </span>
            </div>
            <div className="flex items-center justify-between mt-2">
                <span className="text-xs/6 text-gray-500 dark:text-gray-400">
                    Silver
                </span>
                <span className="text-xs/6 text-gray-500 dark:text-gray-400">
                    Laptop
                </span>
            </div>
        </div>
    );
}