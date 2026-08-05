import { useSeo } from "../../../hooks/useSeo";

// Declarative wrapper over useSeo.js - drop <Seo title="..." .../> at the
// top of a page's JSX instead of calling the hook directly, matching how
// every other cross-cutting concern in this app (analytics, overlays) is a
// component or hook, never called ad hoc from inside render logic.
export function Seo(props) {
    useSeo(props);
    return null;
}
