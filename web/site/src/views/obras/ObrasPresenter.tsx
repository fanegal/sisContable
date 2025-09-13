import { useState } from "react";

export function useObrasPresenter() {

    const [renderOperations, setRenderOperations] = useState(false);

    function onSubmit() {
        console.log("click demo");
    }

    return {
        onSubmit,
        renderOperations,
        setRenderOperations
    }
}