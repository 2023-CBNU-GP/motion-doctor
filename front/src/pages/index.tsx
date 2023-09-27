import Head from 'next/head'
import Layout from "@md/components/layout";
import { useEffect, useState } from "react";
import useForm from "@md/hooks/useForm";
import validate, { InitialValue } from "@md/hooks/validate";
import { UserLogin } from "@md/interfaces/user.interface";
import { useRouter } from "next/router";
import axios from "axios";
import { getCookie, setCookie } from "@md/utils/cookies";

export default function Home() {
    const router = useRouter();

    const [isLogin, setIsLogin] = useState(false);
    const [isPatient, setIsPatient] = useState(true);
    const [loading, setLoading] = useState(false);

    const {values, errors, submitting, handleChange, handleSubmit} = useForm({
        initialValues: {login: true, id: "", password: "", type: "patient"},
        onSubmit: (values: InitialValue) => {
            const data: UserLogin = {
                id: values.id,
                password: values.password as string,
                type: values.type
            };
            axios.post(process.env.NEXT_PUBLIC_API_KEY + '/api/login', data as UserLogin).then(response => {
                if (response.status === 200) {
                    setCookie('jwt', response.data.jwt, {
                        path: '/',
                        secure: true,
                        sameSite: 'none'
                    });

                    axios.get(process.env.NEXT_PUBLIC_API_KEY + '/api/user', {withCredentials: true}).then((values) => {
                        if (values.data.type === "patient") {
                            router.push('/test');
                        } else if (values.data.type === "doctor") {
                            router.push('/doctor/manage');
                        } else {
                            router.push('/approval');
                        }
                        alert("로그인에 성공하셨습니다.");
                    });
                }
            }).catch((error) => {
                if (error.response.data.detail === "User not found!") {
                    errors["id"] = "아이디가 잘못 되었습니다"
                }
                if (error.response.data.detail === "Incorrect password!") {
                    errors["password"] = "비밀번호가 잘못 되었습니다"
                }
                setLoading(!loading);
            });
        },
        validate,
    });

    useEffect(() => {
        if (getCookie('jwt')) {
            router.push('/intro');
        }
    }, []);

    useEffect(() => {

    }, [loading]);


    return (
        <>
            {isLogin ?
                <Layout>
                    <Head>
                        <title>모션 닥터 | 메인페이지</title>
                        <meta name="description" content="Generated by create next app"/>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <link rel="icon" href="/favicon.ico"/>
                    </Head>
                    <main>
                        메인페이지
                    </main>
                </Layout>
                :
                <div className="bg-gray-50 h-screen">
                    <Layout>
                        <Head>
                            <title>모션 닥터 | 로그인</title>
                            <meta name="description" content="Generated by create next app"/>
                            <meta name="viewport" content="width=device-width, initial-scale=1"/>
                            <link rel="icon" href="/favicon.ico"/>
                        </Head>
                        <main className="flex justify-center pt-20">
                            <div className="bg-white px-28 w-2/3 drop-shadow-xl rounded-2xl py-20">
                                <div className="text-5xl font-bold text-color-primary-500">Motion</div>
                                <div className="text-5xl font-bold ">Doctor</div>
                                <div className="flex justify-evenly gap-4 pt-10">
                                    <div
                                        className={`cursor-pointer px-6 py-1 ${isPatient && "border-b-2 border-color-primary-500 font-bold"}`}
                                        onClick={() => {
                                            setIsPatient(true);
                                            values["type"] = "patient"
                                        }}>환자용
                                    </div>
                                    <div
                                        className={`cursor-pointer px-6 py-1 ${!isPatient && "border-b-2 border-color-primary-500 font-bold"}`}
                                        onClick={() => {
                                            setIsPatient(false);
                                            values["type"] = "doctor"
                                        }}>의사용
                                    </div>
                                </div>
                                <div className="pt-8">
                                    <form className="flex flex-col gap-5 px-16 items-end" onSubmit={handleSubmit}
                                          noValidate>
                                        <div className="flex flex-col gap-2 w-full">
                                            <div
                                                className="flex w-full items-center gap-2 border-b-[1px] border-stone-200 pb-1.5">
                                                <label className="w-24 text-sm pb-1">아이디</label>
                                                <input name="id"
                                                       value={values.id}
                                                       onChange={handleChange}
                                                       className="w-full p-1 focus:outline-none" type="text"/>
                                            </div>
                                            {errors.id && <div
                                                className="text-color-danger-500 text-sm pl-[100px]">{errors.id}</div>}
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                            <div
                                                className="flex w-full items-center gap-2 border-b-[1px] border-stone-200 pb-1.5">
                                                <label className="w-24 text-sm pb-1">비밀번호</label>
                                                <input name="password"
                                                       value={values.password}
                                                       onChange={handleChange}
                                                       className="w-full p-1 focus:outline-none" type="password"/>
                                            </div>
                                            {errors.password && <div
                                                className="text-color-danger-500 text-sm pl-[100px]">{errors.password}</div>}
                                        </div>
                                        <div className="flex w-full items-baseline justify-between">
                                            <a className="text-sm text-stone-300 hover:text-color-info-500"
                                               href={`/signup/${values.type}`}>회원가입하기</a>
                                            <button
                                                className="mt-3 py-1 rounded-sm font-bold bg-color-primary-500 text-white w-[42%]"
                                                type="submit" disabled={submitting}>로그인 하기
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </main>
                    </Layout>
                </div>
            }

        </>
    )
}
