import { serve } from "./service";

// 头像模块 查
export async function getHeadImg(props) {
  return serve.get("/users", {
    params: {
      ...props,
    },
  });
}

// 头像模块 增

// 头像模块 删

// 头像模块 改
