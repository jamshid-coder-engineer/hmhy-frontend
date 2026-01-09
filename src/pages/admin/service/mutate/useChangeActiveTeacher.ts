import { useMutation, useQueryClient } from '@tanstack/react-query'
import { request } from '../../../../config/request'

export const useChangeTeacherStatus = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => 
            request.patch(`/teacher/activate/${id}`).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teacherList'] })
        },
    })
}