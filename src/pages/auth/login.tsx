import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button' 
import { PasswordInput } from '../../components/ui/password-input'
import { UseLogin } from './service/use-login'
import { toast } from 'sonner'

const formSchema = z.object({
    username: z.string().min(2, "Username kamida 2 ta belgi bo'lishi kerak").max(50),
    password: z.string().min(2, "Password kamida 2 ta belgi bo'lishi kerak").max(50),
})

const Login = () => {
    const { mutate, isPending } = UseLogin() 
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "bek",
            password: "jamshid000!",
        },
    })
const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data, {
        onSuccess: (res) => {
            // console.log("SUCCESS:", res)
            
            localStorage.setItem('token', res.data.accessToken)
            localStorage.setItem('role', res.data.role.toLowerCase())

            toast.success(res.message.uz || 'Login muvaffaqiyatli!', {
                position: "bottom-right"
            })

            navigate(`/app/${res.data.role.toLowerCase()}`)
        },
        onError: () => {
        }
    })
}

    return (
        <div className='fixed bg-gray-200 inset-0 flex items-center justify-center'>
            <div className='w-125 bg-white shadow rounded-lg p-6'>
                <h1 className='text-3xl font-bold text-center'>Admin Panel</h1>
                <p className='text-center text-[14px] mb-4 mt-2'>Tizim boshqaruvi uchun kirish</p>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-extrabold'>Username</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Enter your username" 
                                            {...field} 
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-extrabold'>Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Enter your password" 
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button 
                            type="submit" 
                            className="w-full"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <span className="animate-spin">⏳</span>
                                    Yuklanmoqda...
                                </span>
                            ) : (
                                'Tizimga kirish'
                            )}
                        </Button>
                        
                        <p className='text-[12px] text-center text-gray-500'>
                            Admin Panel - Faqat ruhsat etilgan foydalanuvchilar uchun
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login