import React, { useEffect } from "react";
import { Comment, Input } from "../index.js";
import { useSelector } from "react-redux";
import {
  useAddComment,
  useComments,
  useInvalidator,
} from "../../hooks/queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useInView } from "react-intersection-observer";

const schema = z.object({
  comment: z.string().min(1),
});

function CommentBox() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const invalidate = useInvalidator();
  const videoId = useSelector((state) => state.video.video?._id);
  const { data: comments, fetchNextPage, isFetched } = useComments(videoId);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const { mutateAsync: addComment } = useAddComment();
  const handleAddComment = async (data) => {
    const res = await addComment({ videoId, comment: data.comment });
    if (res) {
      invalidate(["comments", videoId]);
    }
  };
  return (
    <>
      <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
        <h6 className="font-semibold">573 Comments...</h6>
      </button>
      <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
        <div className="block">
          <h6 className="mb-4 font-semibold">573 Comments</h6>
          <form onSubmit={handleSubmit(handleAddComment)}>
            <Input
              type="text"
              placeholder="Add a Comment"
              id={"comment"}
              className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
              {...register("comment", {
                required: true,
              })}
            />

            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white rounded-lg px-4 py-1"
            >
              Send
            </button>
          </form>
        </div>
        <hr className="my-4 border-white" />
        <div>
          {isFetched &&
            comments?.pages.map((page, index) => {
              return (
                <React.Fragment key={index}>
                  {isFetched &&
                    page.docs.map((comment) => {
                      return <Comment key={comment._id} comment={comment} />;
                    })}
                </React.Fragment>
              );
            })}

          <div ref={ref}></div>
          <Comment />
        </div>
      </div>
    </>
  );
}

export default CommentBox;
