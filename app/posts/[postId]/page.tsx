export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const page = async ({ params }: { params: { postId: number } }) => {
  // SSR
  const url = `https://jsonplaceholder.typicode.com/posts/${params.postId}`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  const jsonres: Promise<Post> = res.json();
  const data: Post = await jsonres;

  //SSG
  // const url = `https://jsonplaceholder.typicode.com/posts/${params.postId}`;
  // const res = await fetch(url)
  // const jsonres: Promise<Post> = res.json();
  // const data: Post = await jsonres;

  // // ISR
  // const url = `https://jsonplaceholder.typicode.com/posts/${params.postId}`;
  // const res = await fetch(url, {
  //   next: {revalidate: 10}
  // })
  // const jsonres: Promise<Post> = res.json();
  // const data: Post = await jsonres;

  return (
    <div className="grid grid-cols-6 gap-x-6 gap-y-3 bg-green-300">
      <div className="col-span-full space-y-3 lg:col-span-4">
        <h1 className="truncate text-2xl font-medium capitalize text-gray-200">
          {data.title}
        </h1>
        <p className="font-medium text-gray-500">{data.body}</p>
      </div>
    </div>
  );
};

export default page;
