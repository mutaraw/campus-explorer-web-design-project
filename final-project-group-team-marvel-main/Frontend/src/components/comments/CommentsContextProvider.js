import { createContext, useContext, useState } from "react";

const CommentsContext = createContext(null);

const CommentsContextProvider = ({ children }) => {
  const [comments, setComments] = useState(null);

  return (
    <CommentsContext.Provider value={{ comments, setComments }}>
      {children}
    </CommentsContext.Provider>
  );
};
const useComments = () => {
    const { comments, setComments } = useContext(CommentsContext);
    return [comments, setComments];
  }

 export {CommentsContextProvider, useComments};
