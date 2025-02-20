import { FC, memo } from "react";

const Home: FC = () => {
    return (
        <div className="m-4 rounded-lg bg-gray-50">
        <span className="text-4xl font-bold ma">Get it done with Handyman</span>
        <div className="text-xl text-gray-600 mt-4">
            Direct contact, no commission and faster results.
        </div>
        </div>
    )
}

export default memo(Home);