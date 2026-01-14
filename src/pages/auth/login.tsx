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
import { LogIn, ShieldCheck } from 'lucide-react' 

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

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate(values, {
            onSuccess: (res) => {
                localStorage.setItem('token', res.data.accessToken)
                localStorage.setItem('role', res.data.role.toLowerCase())
                localStorage.setItem('username', res.data.username)

                toast.success(res.message.uz || 'Login muvaffaqiyatli!')
                navigate(`/app/${res.data.role.toLowerCase()}`)
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message?.uz || "Xatolik yuz berdi")
            }
        })
    }

    return (
        <div className='min-h-screen bg-gray-200 flex items-center justify-center p-4'>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-3xl opacity-50" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50 blur-3xl opacity-50" />
            </div>

            <div className='w-full max-w-110 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 relative z-10'>
                <div className='flex flex-col items-center mb-8'>
                    <div className='w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 mb-4'>
                        <ShieldCheck className='text-white w-8 h-8' />
                    </div>
                    <h1 className='text-2xl font-bold text-slate-900 tracking-tight'>Admin Panel</h1>
                    <p className='text-slate-500 text-sm mt-1 text-center'>
                        Tizim boshqaruvi uchun ma'lumotlaringizni kiriting
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-slate-700 font-semibold'>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="username kiriting"
                                            {...field}
                                            disabled={isPending}
                                            className="h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all"
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
                                    <div className="flex items-center justify-between">
                                        <FormLabel className='text-slate-700 font-semibold'>Parol</FormLabel>
                                    </div>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="••••••••"
                                            {...field}
                                            disabled={isPending}
                                            className="h-11 bg-slate-50/50 border-slate-200 focus:bg-white transition-all"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full h-11 bg-cyan-700 hover:bg-cyan-900 text-white font-medium rounded-lg transition-all shadow-md active:scale-[0.98]"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Yuklanmoqda...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <LogIn className="w-4 h-4" /> Tizimga kirish
                                </span>
                            )}
                        </Button>

                        <div className="relative py-3">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">Yoki</span></div>
                        </div>

                        <div className='text-center'>
                            <p className='text-sm text-slate-500 mb-2'>O'qituvchimisiz?</p>
                            <a
                                href='/teacher/login'
                                className='text-blue-600 hover:text-blue-700 font-semibold text-sm inline-flex items-center gap-1 hover:underline'
                            >
                                Ro'yxatdan o'tish <span className="text-lg">→</span>
                            </a>
                        </div>
                    </form>
                </Form>

                <div className='mt-8 pt-6 border-t border-slate-50'>
                    <p className='text-[11px] text-center text-slate-400 leading-relaxed uppercase tracking-widest'>
                        Xavfsiz tizim boshqaruvi
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login