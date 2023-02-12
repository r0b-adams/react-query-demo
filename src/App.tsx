import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { lorem } from "./utils/lorem";

const POSTS = [
  { id: crypto.randomUUID(), title: lorem.generateWords() },
  { id: crypto.randomUUID(), title: lorem.generateWords() },
];

/**
 * /posts => ["posts"]
 * /posts/1 => ["posts", post.id]
 * /posts?authorId=1 => ["posts", { authorId: 1 }]
 * /posts/2/comments => ["posts", post.id, "comments"]
 */

export const App = () => {
  const queryClient = useQueryClient();

  const posts = useQuery({
    // unique id for your query
    queryKey: ["posts"],
    // the thing that will run to actually grab data (like a resolver)
    // will retry a few times if error thrown
    queryFn: async ({ queryKey }) => {
      // we can access the queryKey array
      // console.log(queryKey);
      await wait(1000);
      return [...POSTS];
    },
  });

  // const newPost = useMutation({
  //   mutationFn: (title: string) =>
  //     wait(1000).then(() => {
  //       POSTS.push({ id: crypto.randomUUID(), title });
  //     }),
  //   onSuccess: () => {
  //     // refetch because we changed data with key "posts"
  //     queryClient.invalidateQueries(["posts"]);
  //   },
  // });

  if (posts.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (posts.isError) {
    return <pre>{JSON.stringify((posts.error as Error).message)}</pre>;
  }

  return (
    <div>
      {posts.data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

// helper to sim load times and occasional errors
const wait = (duration: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (0 === getRandomInt(4)) {
        reject(new Error("server error"));
      } else {
        resolve();
      }
    }, duration);
  });

  //   throw new Error("server error");
  // return new Promise(resolve => setTimeout(resolve, duration));
};

// two main things you can do
// query and mutation
// query => read data
// mutation => change data

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
