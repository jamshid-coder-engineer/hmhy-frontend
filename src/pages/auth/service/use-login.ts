import { request } from "../../../config/request"
import { useMutation } from "@tanstack/react-query"
import { type LoginResponse, type LoginT } from "../types"

export const UseLogin = () => {
  return useMutation({
    mutationFn: (data: LoginT) => 
      request.post<LoginResponse>("/signin/admin", data, {
        withCredentials: true,
      }).then((res) => res.data)
  })
}