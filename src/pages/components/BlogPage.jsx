import  { useEffect } from "react";
import BlogCard from "./BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../redux/slices/blogSlice";

const BlogPage = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blog);

  console.log(blogState,'hi')

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch]);

  if(blogState.isLoading){
    return <h1>Loading</h1>
  }

  if(blogState.isError){
    return <h1>{blogState.errorMessage}</h1>
  }

  return (
    <div className="flex flex-wrap gap-3 mt-5 ml-4">
      {blogState.blogsList.map((blog)=>{
        return <BlogCard key={blog.id} blog={blog}/>
      })
      }
    </div>
  );
};


export default BlogPage;

