import BlogPreview from "@/components/Blogs/BlogPreview";

const BlogList = ({ blogs }) => {
  return (
    <div className="bg-gray-100 min-h-screen py-16">
      {" "}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32">
        {" "}
        <h1 className="text-5xl font-bold text-center mb-12 text-blue-800">
          Blogs
        </h1>{" "}
        <div className="flex flex-col gap-8">
          {" "}
          {blogs.map((blog) => (
            <BlogPreview key={blog._id} blog={blog} />
          ))}{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const baseUrl=process.env.BASE_URL;
  try{
    const res = await fetch(`${baseUrl ? baseUrl : 'http://localhost:3000'}/api/blog`);
    const data = await res.json();
    const blogs = data.data;
    return { props: { blogs } };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { props: { blogs: [] } };
  }
}

export default BlogList;
