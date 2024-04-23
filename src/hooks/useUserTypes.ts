import { getTypesOfUser } from "@/services/typesOfUser/getTypesOfUser";
import { useEffect, useState } from "react";

function useUserTypes(){
    const [userTypes, setUserTypes] = useState<Array<string>>([]);

    useEffect(() => {
        getTypesOfUser().then((userTypes: Array<string>) => {
            setUserTypes(userTypes)
        })
    }, [])


    return { userTypes }


}

export default useUserTypes