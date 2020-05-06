import { useLocation } from "react-router-dom"

export default function useQuery(name) {
    const params = new URLSearchParams(useLocation().search)
    return params.get(name);
}
