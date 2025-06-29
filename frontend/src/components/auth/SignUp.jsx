import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import store from '@/redux/store'
import { Loader2 } from 'lucide-react'

const SignUp = () => {
    const { loading ,user} = useSelector(store => store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        const { fullname, email, phoneNumber, password, role, file } = input;
        formData.append("fullName", fullname);
        formData.append("email", email);
        formData.append("phoneNumber", phoneNumber);
        formData.append("password", password);
        formData.append("role", role);
        if (file) {
            formData.append("file", file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false));
        }
    }

     useEffect(()=>{
           if(user){
             navigate("/");
           }
        },[])
    

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <Label className='my-2'>Full Name</Label>
                        <Input type='text' placeholder='Name'
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='my-2'>
                        <Label className='my-2'>Email</Label>
                        <Input type='email' placeholder='Email' value={input.email}
                            name="email"
                            onChange={changeEventHandler} />
                    </div>
                    <div className='my-2'>
                        <Label className='my-2'>Phone Number</Label>
                        <Input type='number' placeholder='Number' value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler} />
                    </div>
                    <div className='my-2'>
                        <Label className='my-2'>Password</Label>
                        <Input type='password' placeholder='Password' value={input.password}
                            name="password"
                            onChange={changeEventHandler} />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center gap-4 my-5'>
                            <div className="flex items-center space-x-2">
                                <input type='radio' name='role' value='student' className='cursor-pointer'
                                    checked={input.role == 'student'} onChange={changeEventHandler}
                                />
                                <Label htmlFor="option-one">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type='radio' name='role' value='recruiter' className='cursor-pointer'
                                    checked={input.role == 'recruiter'} onChange={changeEventHandler}
                                />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input accept="image/*" type="file" className="cursor-pointer" onChange={changeFileHandler} />

                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> :  <Button type="submit" className='w-full my-4'>Signup</Button>
                    }
                   
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600 underline'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default SignUp
