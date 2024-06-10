import { createContext } from "react";

type loadingInterface =true|false;

const  loadingContext = createContext<loadingInterface>(false);

export default loadingContext;