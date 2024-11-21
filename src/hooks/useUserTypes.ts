import { getTypesOfUser } from "@/services/typesUser/getTypesOfUser";
import { useEffect, useState } from "react";

/**
 * A hook that fetches and manages user types.
 * It uses React's useState and useEffect hooks, along with a custom service for interacting with the backend API.
 * @returns An object containing an array of user types.
 */

function useUserTypes() {
    const [userTypes, setUserTypes] = useState<Array<string>>([]);

    useEffect(() => {
        getTypesOfUser().then((userTypes: Array<string>) => {
            setUserTypes(userTypes)
        })
    }, [])


    return { userTypes }


}

export default useUserTypes